window.addEventListener("load",function(){!function(){function t(){var t=window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop,e=n.classList.contains("back-top--hidden")&&n.classList.contains("js-hidden");(t>350&&e||t<350&&!e)&&o.toggle()}var n=document.getElementById("back-top"),o=new Pack(n);n&&(o.transfrom("back-top--hidden").base("js-hidden").lastStart(),t(),document.addEventListener("scroll",t),n.addEventListener("click",function(){(new Amt).from({top:window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop}).to({top:0}).transition(1e3).on("frame",function(t){window.scrollTo(0,t.top)}).start()}))}()});