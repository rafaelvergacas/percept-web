/* ============================================================
   1 · Símbolo em 3D — bipirâmide hexagonal.
   Em rotação 0 a vista frontal é EXATAMENTE o logo do brandbook
   (hexágono, 6 facetas do centro, mesmas cores da pág. 02).
   Girar revela o volume que o símbolo já sugeria — não inventa
   outra forma. Oscila devagar em vez de dar voltas completas,
   para o mark nunca ficar de costas.
   ============================================================ */
(function(){
  const HEX=[], N=6;
  for(let i=0;i<N;i++){                       // hexágono no plano XY
    const a=Math.PI/2 - i*Math.PI/3;          // topo primeiro, sentido horário
    HEX.push([Math.cos(a),Math.sin(a),0]);
  }
  const D=0.52;                               // profundidade dos ápices
  const FRONT=[0,0,D], BACK=[0,0,-D];
  const FILL=[[0x7A,0x8C,0xFF],[0x5B,0x6C,0xFF],[0x38,0x46,0xC4],
              [0x20,0x23,0x28],[0x2B,0x2F,0x39],[0x36,0x3B,0x45]];
  const faces=[];
  for(let i=0;i<N;i++){
    faces.push({v:[FRONT,HEX[i],HEX[(i+1)%N]], c:FILL[i]});          // frente
    faces.push({v:[BACK,HEX[(i+1)%N],HEX[i]], c:FILL[i].map(x=>Math.round(x*0.62))}); // verso
  }
  const L=(()=>{const v=[-.5,.72,.85],l=Math.hypot(...v);return v.map(c=>c/l)})();

  function make(cv){
    const ctx=cv.getContext('2d'), S=cv.width, R=S*0.40;
    return function(ry,rx){
      ctx.clearRect(0,0,S,S);
      const rot=p=>{
        let [x,y,z]=p;
        let y2=y*Math.cos(rx)-z*Math.sin(rx), z2=y*Math.sin(rx)+z*Math.cos(rx);
        return [x*Math.cos(ry)+z2*Math.sin(ry), y2, -x*Math.sin(ry)+z2*Math.cos(ry)];
      };
      faces.map(f=>{
        const v=f.v.map(rot);
        return {v,c:f.c,z:(v[0][2]+v[1][2]+v[2][2])/3};
      }).sort((p,q)=>p.z-q.z).forEach(({v,c})=>{
        const u=[v[1][0]-v[0][0],v[1][1]-v[0][1],v[1][2]-v[0][2]];
        const w=[v[2][0]-v[0][0],v[2][1]-v[0][1],v[2][2]-v[0][2]];
        let n=[u[1]*w[2]-u[2]*w[1],u[2]*w[0]-u[0]*w[2],u[0]*w[1]-u[1]*w[0]];
        const nl=Math.hypot(...n); n=n.map(t=>t/nl);
        if(n[2]<=0.015) return;                          // back-face culling
        const lam=Math.max(0,n[0]*L[0]+n[1]*L[1]+n[2]*L[2]);
        const k=0.62+lam*0.62;
        const col=c.map(t=>Math.min(255,Math.round(t*k)));
        ctx.fillStyle='rgb('+col[0]+','+col[1]+','+col[2]+')';
        ctx.beginPath();
        v.forEach((p,j)=>{const X=S/2+p[0]*R, Y=S/2-p[1]*R;
          j?ctx.lineTo(X,Y):ctx.moveTo(X,Y)});
        ctx.closePath(); ctx.fill();
      });
    };
  }

  const draws=['heromark','navmark','footmark']
    .map(id=>document.getElementById(id)).filter(Boolean).map(make);
  if(!draws.length) return;

  if(matchMedia('(prefers-reduced-motion:reduce)').matches){
    draws.forEach(d=>d(0,0)); return;                    // parado = logo exato
  }
  let live=true;
  const hero=document.querySelector('.hero');
  if(hero) new IntersectionObserver(e=>{live=e[0].isIntersecting;},{threshold:0}).observe(hero);
  (function loop(ms){
    if(live){
      const t=ms/1000;
      const ry=Math.sin(t*0.16)*0.62;      // oscila ±36°, ~39s por ciclo
      const rx=Math.sin(t*0.11)*0.16;
      draws.forEach(d=>d(ry,rx));
    }
    requestAnimationFrame(loop);
  })(0);
})();

/* ============================================================
   2 · Scroll reveal — IntersectionObserver, stagger por bloco.
   Sem GSAP de propósito: 70 KB para um fade é custo sem retorno,
   e o brandbook proíbe parallax. Se quiser trocar por GSAP,
   substitua este bloco por ScrollTrigger.batch(".rv", {...}).
   ============================================================ */
(function(){
  const els=[...document.querySelectorAll('.rv')];
  if(!els.length) return;
  if(matchMedia('(prefers-reduced-motion:reduce)').matches){
    els.forEach(e=>e.classList.add('in')); return;
  }
  const io=new IntersectionObserver((entries)=>{
    entries.filter(e=>e.isIntersecting).forEach((e,i)=>{
      setTimeout(()=>e.target.classList.add('in'), i*60);   // stagger
      io.unobserve(e.target);
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  els.forEach(e=>io.observe(e));
})();

/* ============================================================
   3 · Nav border on scroll
   ============================================================ */
(function(){
  const nav=document.getElementById('nav');
  const top=document.querySelector('.hero,.doc-head');
  if(!nav||!top) return;
  const io=new IntersectionObserver(([e])=>nav.classList.toggle('stuck',!e.isIntersecting),
    {rootMargin:'-69px 0px 0px 0px'});
  io.observe(top);
})();

(function(){
  const sw=document.querySelector('.lang');
  if(!sw) return;
  sw.querySelectorAll('a[data-lang]').forEach(a=>a.addEventListener('click',()=>{
    try{localStorage.setItem('lang',a.dataset.lang);}catch(e){}
    if(location.hash) a.href=a.getAttribute('href')+location.hash;
  }));
  document.addEventListener('click',e=>{if(sw.open&&!sw.contains(e.target)) sw.open=false;});
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&sw.open){sw.open=false;sw.querySelector('summary').focus();}
  });
})();

(function(){
  const ua=navigator.userAgent;
  const ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
  const url=/Android/i.test(ua)?'https://play.google.com/store/apps/details?id=com.percep2.app':ios?'https://apps.apple.com/app/id6810863761':null;
  if(url)document.querySelectorAll('a.btn-p[href="#get"]').forEach(a=>{a.href=url;});
})();
