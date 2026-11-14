(function(w){
  var URLS={
    ios:'https://apps.apple.com/app/id6810863761',
    android:'https://play.google.com/store/apps/details?id=com.percep2.app'
  };
  function storePlatform(){
    var ua=navigator.userAgent;
    var ios=/iPhone|iPad|iPod/i.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
    return /Android/i.test(ua)?'android':ios?'ios':null;
  }
  function storeUrl(platform,referrer){
    var p=platform||storePlatform();
    if(!URLS[p]) return null;
    return p==='android'&&referrer?URLS[p]+'&referrer='+encodeURIComponent(referrer):URLS[p];
  }
  w.STORE_URLS=URLS;
  w.storePlatform=storePlatform;
  w.storeUrl=storeUrl;
})(window);
