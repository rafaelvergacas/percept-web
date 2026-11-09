(function(){
  const root=document.getElementById('demo');
  if(!root) return;
  const scr=root.querySelector('.scr');
  const railItems=[...root.querySelectorAll('.rail li')];
  const pt=(document.documentElement.lang||'').toLowerCase().startsWith('pt');

  const DATA={
    en:{
      time:'15:21',me:'A',youreIn:'You’re in',place:'Sliema',
      twoRooms:'Two rooms are always on here — one for your street, one for Malta.',
      wider:{eb:'Wider · always on',span:'~150 km across',name:'Malta',last:'Nina: Anyone know a good plumber?',when:'Wed'},
      local:{eb:'Local · always on',span:'~1 km across',name:'Sliema',
        last:'Nina: Just moved onto this street. Where do people eat around here?',when:'15:04',
        fresh:'Tom: Skip the promenade. The small place behind the church does great ftira.',freshWhen:'15:21'},
      openChats:'Open chats you’re in',newChat:'+ New',
      emptyT:'Still quiet on your subject?',emptyB:'Open a chat and anyone nearby can find it in Discovery.',
      convos:'Your conversations',convo:['Lena','Sure, see you by the kiosk'],
      tabs:['Chats','Discovery','Menu'],
      discEb:'Discover',discTitle:'Open chats near you',nearby:n=>n+' nearby',
      disc:[['Live music at Balluta','200 m away · 12 messages'],['Padel, need a fourth','450 m away · 6 messages'],
        ['Lost cat, Rudolph Street','700 m away · 4 messages'],['Beach clean-up, Sunday 9am','1.2 km away · 9 messages'],
        ['Selling a bike, cheap','2.4 km away · 5 messages']],
      fab:'+ Open a chat',today:'Today',placeholder:'Message…',typing:'Someone is typing…',
      area:{sub:'Always on · everyone here ›',note:'This room is always on for where you are. Anyone here can read what you write.',
        msgs:[{n:'Nina',t:'15:04',x:'Just moved onto this street. Where do people eat around here?'},
          {n:'Tom',t:'15:21',x:'Skip the promenade. The small place behind the church does great ftira.'}],
        ask:'Is the ferry running in this wind?',askT:'15:22',
        replies:[{n:'Ravi',t:'15:22',x:'Running, 20 min delay. Bus 13 is faster.'},{n:'Lena',t:'15:23',x:'Confirmed, just got off it.'}]},
      prof:{bio:'Two streets from the ferry. Ask me about buses.',msg:'Message',view:'Profile',close:'Close'},
      open:{sub:'14 members ›',left:'1h 12m left',mem:['M','S'],memLabel:'Mark, Sara +12',
        note:'Open chat. Anyone nearby can join while it is live.',
        msgs:[{n:'Mark',t:'15:09',x:'Band starts at 9, free entry.'},{n:'Sara',t:'15:16',x:'Bring a jacket, it’s right by the sea.'}],
        ask:'Still room inside?',askT:'15:24',reply:{n:'Jo',t:'15:24',x:'Loads, come to the back bar.'},frac:.6},
      create:{title:'Open a chat here',sub:'Anyone within 1 km sees it and can walk in.',
        subNo:'Anyone in your immediate area sees it and can walk in.',addPhoto:'ADD PHOTO',ph:'What’s this about?',
        who:'Who can see it',chips:['Around here · 1 km','Nearby · 5 km','Wider area · 50 km'],
        outside:'People outside the area won’t see this chat.',durT:'Clears in two hours',
        durS:'Built for right now. Convert it later if it turns into something.',submit:'Open the chat',
        subject:'Football at Tigné, need 2 more'},
      made:{sub:'1 member ›',justYou:'Just you',left:'1h 59m left',
        adm:'You opened this. It clears in <strong>1h 59m</strong> unless you keep it.',keep:'Keep it open',
        disc:'10 m away · No messages yet',tag:'YOURS'}
    },
    pt:{
      time:'19:21',me:'A',youreIn:'Você está em',place:'Pinheiros',
      twoRooms:'Duas salas estão sempre no ar aqui — uma para a sua rua e outra para São Paulo.',
      wider:{eb:'Região · sempre no ar',span:'~150 km de extensão',name:'São Paulo',last:'Carla: Alguém indica um encanador?',when:'qua.'},
      local:{eb:'Bairro · sempre no ar',span:'~1 km de extensão',name:'Pinheiros',
        last:'Bia: Acabei de me mudar pra rua. Onde se come bem por aqui?',when:'19:04',
        fresh:'Lucas: Fuja da Faria Lima. O boteco atrás da igreja tem o melhor pastel.',freshWhen:'19:21'},
      openChats:'Chats abertos em que você está',newChat:'+ Novo',
      emptyT:'Ninguém falando do seu assunto?',emptyB:'Abra um chat e qualquer pessoa por perto pode encontrá-lo em Descobrir.',
      convos:'Suas conversas',convo:['Ana','Fechado, te vejo na banca'],
      tabs:['Chats','Descobrir','Menu'],
      discEb:'Descobrir',discTitle:'Chats abertos perto de você',nearby:n=>n+' por perto',
      disc:[['Roda de samba no Largo da Batata','a 300 m · 18 mensagens'],['Falta um no futebol society','a 450 m · 6 mensagens'],
        ['Gato perdido na Rua dos Pinheiros','a 700 m · 4 mensagens'],['Troca de livros na praça','a 1,2 km · 9 mensagens'],
        ['Vendo bike, baratinho','a 2,4 km · 5 mensagens']],
      fab:'+ Abrir um chat',today:'Hoje',placeholder:'Mensagem…',typing:'Alguém está digitando…',
      area:{sub:'Sempre no ar · todo mundo daqui ›',
        note:'Esta sala está sempre no ar para o lugar onde você está. Qualquer pessoa aqui pode ler o que você escreve.',
        msgs:[{n:'Bia',t:'19:04',x:'Acabei de me mudar pra rua. Onde se come bem por aqui?'},
          {n:'Lucas',t:'19:21',x:'Fuja da Faria Lima. O boteco atrás da igreja tem o melhor pastel.'}],
        ask:'Alguém sabe se a Teodoro tá alagada?',askT:'19:22',
        replies:[{n:'Diego',t:'19:22',x:'Tá sim, desvia pela Cardeal.'},{n:'Bia',t:'19:23',x:'Acabei de passar, tá parado.'}]},
      prof:{bio:'Morador de Pinheiros desde sempre. Pergunte do trânsito.',msg:'Mensagem',view:'Perfil',close:'Fechar'},
      open:{sub:'23 membros ›',left:'1h 12min restantes',mem:['F','G'],memLabel:'Fê, Gui +21',
        note:'Chat aberto. Qualquer pessoa por perto pode entrar enquanto ele estiver no ar.',
        msgs:[{n:'Fê',t:'19:09',x:'Começa às 19h30, chega cedo.'},{n:'Gui',t:'19:16',x:'Tem cerveja gelada no bar da esquina.'}],
        ask:'Ainda tem lugar?',askT:'19:24',reply:{n:'Fê',t:'19:24',x:'Tem sim, chega mais!'},frac:.6},
      create:{title:'Abra um chat aqui',sub:'Qualquer pessoa num raio de 1 km vê o chat e pode entrar.',
        subNo:'Qualquer pessoa na sua área imediata vê o chat e pode entrar.',addPhoto:'+ FOTO',ph:'Qual é o assunto?',
        who:'Quem pode ver',chips:['Aqui perto · 1 km','Arredores · 5 km','Região · 50 km'],
        outside:'Quem estiver fora da área não verá este chat.',durT:'Some em duas horas',
        durS:'Feito para o agora. Transforme depois, se virar algo maior.',submit:'Abrir o chat',
        subject:'Futebol no Villa-Lobos, faltam 2'},
      made:{sub:'1 membro ›',justYou:'Só você',left:'1h 59min restantes',
        adm:'Você abriu este chat. Ele some em <strong>1h 59min</strong>, a menos que você o mantenha.',keep:'Manter aberto',
        disc:'a 10 m · Nenhuma mensagem ainda',tag:'SEU'}
    }
  };
  const D=pt?DATA.pt:DATA.en;

  const svg=(d,s,extra)=>`<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra||''}>${d}</svg>`;
  const I={
    back:svg('<path d="M15 5l-7 7 7 7"/>',18),
    chev:svg('<path d="M9 5l7 7-7 7"/>',16),
    send:svg('<path d="M12 19V5M5 12l7-7 7 7"/>',20),
    chat:svg('<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3.5 21l1.3-4.6A8.5 8.5 0 1 1 21 12z"/>',21),
    disc:svg('<circle cx="12" cy="12" r="9"/><path d="M15.6 8.4l-2.1 5.1-5.1 2.1 2.1-5.1z"/>',21),
    user:svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.4-6 8-6s6.5 2 8 6"/>',21),
    msg:svg('<path d="M21 12a8.5 8.5 0 0 1-12.4 7.6L3.5 21l1.3-4.6A8.5 8.5 0 1 1 21 12z"/>',17),
    prof:svg('<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.4-6 8-6s6.5 2 8 6"/>',17),
    wifi:svg('<path d="M2 8.5a15 15 0 0 1 20 0M5.5 12a10 10 0 0 1 13 0M9 15.5a5 5 0 0 1 6 0"/><circle cx="12" cy="19" r=".8" fill="currentColor"/>',15),
    sig:'<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="3" y="15" width="3.5" height="6" rx="1"/><rect x="8.5" y="11" width="3.5" height="10" rx="1"/><rect x="14" y="7" width="3.5" height="14" rx="1"/><rect x="19.5" y="3" width="3" height="18" rx="1" opacity=".35"/></svg>'
  };
  function hex(sz){
    const F=['#7A8CFF','#5B6CFF','#3846C4','#202328','#2B2F39','#363B45'];
    let p='';
    for(let i=0;i<6;i++){
      const a=(90-i*60)*Math.PI/180,b=(90-(i+1)*60)*Math.PI/180;
      p+=`<path d="M0 0L${Math.cos(a).toFixed(3)} ${(-Math.sin(a)).toFixed(3)}L${Math.cos(b).toFixed(3)} ${(-Math.sin(b)).toFixed(3)}Z" fill="${F[i]}"/>`;
    }
    return `<svg width="${sz}" height="${sz}" viewBox="-1 -1 2 2" aria-hidden="true">${p}</svg>`;
  }
  const AV=['#363B45','#2D3A52','#3D3150','#2E4339','#4A3A30','#2F3F4D'];
  const avc=n=>AV[[...n].reduce((s,c)=>s+c.charCodeAt(0),0)%AV.length];
  const av=(n,cls)=>`<div class="av${cls?' '+cls:''}" style="background:${avc(n)}">${n[0]}</div>`;
  const hexAv=()=>`<div class="av hex">${hex(18)}</div>`;

  const q=s=>scr.querySelector(s);
  const msgHTML=(m,anim)=>m.mine
    ?`<div class="m mine${anim?' msg-in':''}"><div class="who">${m.t}</div><div class="bub">${m.x}</div></div>`
    :`<div class="m${anim?' msg-in':''}" data-n="${m.n}">${av(m.n)}<div><div class="who"><b>${m.n}</b>${m.t}</div><div class="bub">${m.x}</div></div></div>`;
  const areaHTML=(a,cls)=>`<div class="area ${cls}"><div class="top"><span class="eb acc">${a.eb}</span><span class="span">${a.span}</span></div>
    <div class="nm">${a.name}</div><div class="last"><span>${a.last}</span><span class="when"><i class="dot"></i><span>${a.when}</span></span></div></div>`;
  const discRow=(d,cls)=>`<div class="row${cls?' '+cls:''}">${hexAv()}<div class="bd"><div class="t"><b>${d[0]}</b></div><div class="s">${d[1]}</div></div><span class="chev">${I.chev}</span></div>`;
  const openRow=(title,tag,frac,left)=>`<div class="row enter">${hexAv()}<div class="bd"><div class="t"><b>${title}</b>${tag?`<span class="tag">${tag}</span>`:''}</div>
    <div class="exp" style="--f:${frac*100}%"><i></i><span>${left}</span></div></div></div>`;

  function reset(){
    const c=D.create;
    scr.innerHTML=`
<div class="sb"><span>${D.time}</span><span class="cam"></span><span class="ic">${I.wifi}${I.sig}<span class="bat">87</span></span></div>
<div class="layer L-tabs">
  <div class="page" data-p="chats">
    <div class="hdr"><div class="brandl">${hex(20)}percep2</div><div class="me">${D.me}</div></div>
    <div class="eb">${D.youreIn}</div><div class="place">${D.place}</div><div class="lede">${D.twoRooms}</div>
    ${areaHTML(D.wider,'wider')}${areaHTML(D.local,'local')}
    <div class="sec"><span class="eb">${D.openChats}</span><span class="new">${D.newChat}</span></div>
    <div class="open"><div class="empty"><b>${D.emptyT}</b><span>${D.emptyB}</span></div></div>
    <div class="sec"><span class="eb">${D.convos}</span></div>
    <div class="row">${av(D.convo[0])}<div class="bd"><div class="t"><b>${D.convo[0]}</b></div><div class="s">${D.convo[1]}</div></div></div>
  </div>
  <div class="page" data-p="disc" hidden>
    <div class="eb">${D.discEb}</div><div class="dtitle">${D.discTitle}</div>
    <div class="eb dcount" style="margin-bottom:10px">${D.nearby(D.disc.length)}</div>
    <div class="dlist">${D.disc.map(d=>discRow(d)).join('')}</div>
    <div class="fab">${D.fab}</div>
  </div>
  <div class="tabbar">
    <div class="tab on" data-t="chats">${I.chat}${D.tabs[0]}</div>
    <div class="tab" data-t="disc">${I.disc}${D.tabs[1]}</div>
    <div class="tab" data-t="menu">${I.user}${D.tabs[2]}</div>
  </div>
</div>
<div class="layer L-room off"></div>
<div class="scrim"></div>
<div class="sheet" data-s="prof"><div class="handle"></div><div class="prof">
  ${av(D.area.replies[0].n,'big')}<div class="nm">${D.area.replies[0].n}</div><div class="bio">${D.prof.bio}</div>
  <div class="acts"><div class="act pri">${I.msg}${D.prof.msg}</div><div class="act">${I.prof}${D.prof.view}</div></div>
  <div class="close">${D.prof.close}</div></div></div>
<div class="sheet" data-s="create"><div class="handle"></div>
  <div class="sh-t">${c.title}</div><div class="sh-s">${c.subNo}</div>
  <div class="ph-row"><div class="addph">${c.addPhoto}</div><div class="field">${c.ph}</div></div>
  <div class="eb">${c.who}</div>
  <div class="chips"><span class="chip">${c.chips[0]}</span><span class="chip lock">${c.chips[1]}<em>PLUS</em></span><span class="chip lock">${c.chips[2]}<em>PLUS</em></span></div>
  <div class="small">${c.outside}</div>
  <div class="dur"><div><b>${c.durT}</b><span>${c.durS}</span></div><em>2h</em></div>
  <div class="submit">${c.submit}</div></div>
<div class="tap"></div>`;
  }

  let token=0,paused=false,visible=true,instant=false,cur=0,sceneT=0;
  const EST=[3800,7600,4900,7000,10400];
  const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const ABORT={};
  function wait(ms){
    const my=token;
    if(instant) return my===token?Promise.resolve():Promise.reject(ABORT);
    return new Promise((res,rej)=>{
      let left=ms,last=performance.now();
      (function f(now){
        if(my!==token) return rej(ABORT);
        if(now!==undefined&&!paused&&visible&&!document.hidden){const dt=Math.min(now-last,100);left-=dt;sceneT+=dt;}
        last=now===undefined?last:now;
        if(left<=0) res(); else requestAnimationFrame(f);
      })();
    });
  }

  async function tap(el,hold){
    if(instant) return;
    const t=q('.tap'),r=el.getBoundingClientRect(),s=scr.getBoundingClientRect(),k=s.width/360||1;
    t.style.left=((r.left+r.width/2-s.left)/k)+'px';
    t.style.top=((r.top+r.height/2-s.top)/k)+'px';
    t.classList.remove('go','hold'); void t.offsetWidth;
    t.classList.add(hold?'hold':'go');
    await wait(hold?250:420);
  }
  const release=()=>q('.tap').classList.remove('hold','go');

  async function type(box,text){
    box.classList.add('focus','has');
    if(instant){box.textContent=text;box.classList.remove('focus');return;}
    for(let i=1;i<=text.length;i++){
      box.innerHTML='';box.append(text.slice(0,i));
      const c=document.createElement('span');c.className='caret';box.append(c);
      await wait(text[i-1]===' '?60:34);
    }
    box.textContent=text;
  }

  const L=()=>({tabs:q('.L-tabs'),room:q('.L-room')});
  function openRoom(c){
    const {tabs,room}=L();
    room.innerHTML=`<div class="rm-top"><div class="rm-h"><div class="back">${I.back}</div><div class="ti"><b>${c.title}</b><span>${c.sub}</span></div>${c.left?`<div class="left">${c.left}</div>`:''}</div>
      ${c.mem?`<div class="mem"><span class="stk">${c.mem.map(n=>av(n)).join('')}</span>${c.memLabel}</div>`:''}
      ${c.adm?`<div class="adm"><div>${c.adm}</div><div class="keep">${c.keep}</div></div>`:''}</div>
      <div class="msgs">${c.note?`<div class="note">${c.note}</div>`:''}${c.msgs?`<div class="day">${D.today}</div>`+c.msgs.map(m=>msgHTML(m)).join(''):''}</div>
      <div class="cmp"><div class="in">${D.placeholder}</div><div class="send">${I.send}</div></div>`;
    room.classList.remove('off');tabs.classList.add('under');
  }
  function closeRoom(){const {tabs,room}=L();room.classList.add('off');tabs.classList.remove('under');}
  function sheet(name,on){q('.scrim').classList.toggle('on',on);q(`[data-s="${name}"]`).classList.toggle('on',on);}
  function showTab(t){
    scr.querySelectorAll('.page').forEach(p=>p.hidden=p.dataset.p!==t);
    scr.querySelectorAll('.tab').forEach(b=>b.classList.toggle('on',b.dataset.t===t));
  }
  function addMsg(m){q('.L-room .msgs').insertAdjacentHTML('beforeend',msgHTML(m,true));}
  async function send(text,t){
    const box=q('.L-room .in'),btn=q('.L-room .send');
    await tap(box);await type(box,text);btn.classList.add('on');await wait(280);
    await tap(btn);box.classList.remove('focus','has');box.textContent=D.placeholder;btn.classList.remove('on');
    addMsg({mine:true,t,x:text});
  }
  async function reply(m,ms){
    const ty=document.createElement('div');ty.className='typing msg-in';
    ty.innerHTML=`<i></i><i></i><i></i>${D.typing}`;
    q('.L-room .msgs').append(ty);await wait(ms);ty.remove();addMsg(m);
  }

  const SCENES=[
    async()=>{
      await wait(1200);
      const c=q('.area.local');
      c.querySelector('.last>span').textContent=D.local.fresh;
      c.querySelector('.when>span').textContent=D.local.freshWhen;
      c.classList.add('unread','ping');
      await wait(2600);
    },
    async()=>{
      const c=q('.area.local');await tap(c);c.classList.remove('unread','ping');
      openRoom({title:D.local.name,sub:D.area.sub,note:D.area.note,msgs:D.area.msgs});
      await wait(700);
      await send(D.area.ask,D.area.askT);
      await wait(350);await reply(D.area.replies[0],1100);
      await wait(250);await reply(D.area.replies[1],800);
      await wait(1000);
    },
    async()=>{
      await tap(q(`.L-room .m[data-n="${D.area.replies[0].n}"] .av`));sheet('prof',true);
      await wait(800);
      const b=q('[data-s="prof"] .act.pri');await tap(b,true);b.classList.add('press');
      await wait(1000);b.classList.remove('press');release();
      await wait(400);await tap(q('[data-s="prof"] .close'));sheet('prof',false);
      await wait(500);await tap(q('.L-room .back'));closeRoom();
      await wait(500);
    },
    async()=>{
      await tap(q('.tab[data-t="disc"]'));showTab('disc');
      await wait(800);
      await tap(q('.dlist .row'));
      const o=D.open;
      openRoom({title:D.disc[0][0],sub:o.sub,left:o.left,mem:o.mem,memLabel:o.memLabel,note:o.note,msgs:o.msgs});
      await wait(700);
      await send(o.ask,o.askT);
      await wait(300);await reply(o.reply,1000);
      await wait(1100);
    },
    async()=>{
      const c=D.create,m=D.made;
      await tap(q('.L-room .back'));closeRoom();
      await wait(500);await tap(q('.fab'));sheet('create',true);
      await wait(550);
      const f=q('.field');await tap(f);await type(f,c.subject);f.classList.remove('focus');
      await wait(250);
      const ch=q('.chip');await tap(ch);ch.classList.add('on');q('.sh-s').textContent=c.sub;
      await wait(750);
      await tap(q('.submit'));sheet('create',false);
      q('.dlist').insertAdjacentHTML('afterbegin',discRow([c.subject,m.disc],'enter'));
      q('.dcount').textContent=D.nearby(D.disc.length+1);
      openRoom({title:c.subject,sub:m.sub,left:m.left,mem:[D.me],memLabel:m.justYou,adm:m.adm,keep:m.keep,note:D.open.note});
      await wait(1700);
      await tap(q('.L-room .back'));closeRoom();
      await wait(450);
      q('.open').innerHTML=openRow(c.subject,m.tag,1,m.left)+openRow(D.disc[0][0],'',D.open.frac,D.open.left);
      await tap(q('.tab[data-t="chats"]'));showTab('chats');
      await wait(2400);
    }
  ];

  const dots=root.querySelector('.dots');
  if(dots) dots.innerHTML=railItems.map((li,i)=>`<button type="button" aria-label="${li.querySelector('b').textContent}"></button>`).join('');
  const dotBtns=dots?[...dots.children]:[];
  function setActive(i){
    cur=i;sceneT=0;
    railItems.forEach((li,j)=>{li.classList.toggle('on',j===i);li.style.setProperty('--p',reduce?1:0);});
    dotBtns.forEach((b,j)=>b.toggleAttribute('aria-current',j===i));
  }
  (function bar(){
    const li=railItems[cur];
    if(li&&!reduce) li.style.setProperty('--p',Math.min(1,sceneT/EST[cur]).toFixed(3));
    requestAnimationFrame(bar);
  })();

  async function play(from){
    const my=++token;
    try{
      instant=true;scr.classList.add('instant');
      reset();
      for(let i=0;i<from;i++) await SCENES[i]();
      if(reduce){setActive(from);await SCENES[from]();return;}
      instant=false;void scr.offsetWidth;scr.classList.remove('instant');
      let i=from;
      for(;;){
        setActive(i);
        await SCENES[i]();
        i++;
        if(i===SCENES.length){
          scr.classList.add('fade');await wait(450);
          instant=true;scr.classList.add('instant');reset();instant=false;
          void scr.offsetWidth;scr.classList.remove('instant','fade');
          i=0;
        }
      }
    }catch(e){
      if(e!==ABORT) throw e;
    }finally{
      if(my===token){instant=false;scr.classList.remove('instant');}
    }
  }

  railItems.forEach((li,i)=>li.querySelector('button').addEventListener('click',()=>play(i)));
  dotBtns.forEach((b,i)=>b.addEventListener('click',()=>play(i)));
  const ph=root.querySelector('.phone');
  ph.addEventListener('mouseenter',()=>{paused=true;});
  ph.addEventListener('mouseleave',()=>{paused=false;});
  new IntersectionObserver(e=>{visible=e[0].isIntersecting;},{threshold:.15}).observe(root);
  play(0);
})();
