var n_dark_themes = 3;
var tab = document.location.href;
var link = document.getElementById("dark-mode");
var style = document.getElementById("dark-mode-custom-style");
var head = document.documentElement || document.head || document.querySelector("head");
var iseventfired = true;
var css4iframe = '';

var hostname = function (url) {
  url = url.replace("www.", '');
  var s = url.indexOf("//") + 2;
  if (s > 1) {
    var o = url.indexOf('/', s);
    if (o > 0) return url.substring(s, o);
    else {
      o = url.indexOf('?', s);
      if (o > 0) return url.substring(s, o);
      else return url.substring(s);
    }
  } else return url;
};

var custom = {
  "ebay": ".ebay.com",
  "yahoo": "www.yahoo.",
  "twitch": ".twitch.tv",
  "github": "github.com",
  "docs": "docs.google.",
  "bing": "www.bing.com",
  "amazon": "www.amazon.",
  "gmail": "mail.google.",
  "tumblr": "www.tumblr.",
  "twitter": "twitter.com",
  "inbox": "inbox.google.",
  "drive": "drive.google.",
  "sites": "sites.google.",
  "youtube": "www.youtube.",
  "dropbox": "www.dropbox.",
  "reddit": "www.reddit.com",
  "maps": ".google.com/maps/",
  "facebook": "www.facebook.",
  "wikipedia": "wikipedia.org",
  "instagram": "www.instagram.",
  "duckduckgo": "duckduckgo.com",
  "stackoverflow": "stackoverflow.com",
  "vimeo": "vimeo.com",
  "aljazeera":"aljazeera.com",
  "microsoft":"microsoft.com",
  "analytics":"analytics.google.",
  "chicagotribune":"chicagotribune.com",
  "schoology":"schoology.com",
  "pinterest":".pinterest.com",
  "xbox":".xbox.com",
  "vk":"vk.com",
  "espn":"espn.com",
  "oracle":"oracle.com",
  "translate":"translate.google.",
  "whatsapp":"whatsapp.com",
  "bilibili":"bilibili.com",
  "ecjugend":"ec-jugend.de",
  "7plusau":"7plus.com.au"
};

if (!link) {
  link = document.createElement("link");
  link.setAttribute("type", "text/css");
  link.setAttribute("id", "dark-mode");
  link.setAttribute("rel", "stylesheet");
  if (head) head.appendChild(link);
}

if (!style) {
  style = document.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("id", "dark-mode-custom-style");
}

var edit = function (href, txt) {
  link.setAttribute("href", href);
  if(href==='')
	  forcedarkTwitter(false, href);
  else
	  forcedarkTwitter(true, href);
  style.textContent = txt;
  chrome.storage.local.get("sdm_low_contrast", function(e){
	if(e["sdm_low_contrast"]===true){
		if(href==='')
			removelowcontrastfilter();
		 else
			addlowcontrastfilter();
	}else{
		removelowcontrastfilter();
	}
  });
  chrome.storage.local.get("sdm_range_value", function(e){
	  removelowcontrastfilter();
	  if(href!=='')
		  setTimeout(function(){
			  addlowcontrastfilter();
		  }, 100);
  });
  chrome.storage.local.get("sdm_enable_pattern", function(e){
	if(e["sdm_enable_pattern"]===true){
		if(href==='')
			disablepattern();
		 else
			enablepattern();
	}else{
		disablepattern();
	}
  });
  chrome.storage.local.get("dark_2", function(e){
	  if(e.dark_2)
		  addcustomecolorschemes();
	  else{
		var dmdc = document.getElementById('dark-mode-custom-color');
		if(dmdc!==undefined && dmdc!==null)
			dmdc.remove();
	  }
  });
  chrome.storage.local.get("sdm_custom_css", function(e){
	var sdmcss = document.getElementById("sdm_custom_css");
	if(e["sdm_custom_css"]!==undefined && e["sdm_custom_css"]!==null && e["sdm_custom_css"]!==""){
		if(href!=='')
			customCSS(e["sdm_custom_css"]);
		else{
			if(sdmcss!=null)
				sdmcss.remove();
		}
	}else{
		if(sdmcss!=null)
			sdmcss.remove();
	}
  });
};

function forcedarkTwitter(twdark, src){
	var timetwitter = setInterval(function(){
		var shadowroots = document.querySelectorAll('*');
		var counteri = 0;
		for(var i=0; i<shadowroots.length; i++)
			if (shadowroots[i].shadowRoot != undefined && shadowroots[i] != null) {
				var sheet = new CSSStyleSheet;
				if(twdark)
					sheet.replaceSync(`*{background-color:black !important; color:gray !important; border: none !important;}`);
				else
					sheet.replaceSync(`*{background-color:black !important; color:gray !important; border: none !important;}`);
				shadowroots[i].shadowRoot.adoptedStyleSheets = [ sheet ];
				
				if(counteri===0) clearInterval(timetwitter);
				counteri++;
			}
	}, 500);
}

function customCSS(xxx){
	style3 = document.createElement('style');
	style3.type = 'text/css';
	style3.id = "sdm_custom_css";
	if (style3.styleSheet){
	  style3.styleSheet.cssText = xxx;
	} else {
	  style3.appendChild(document.createTextNode(xxx));
	}
	head.appendChild(style3);
}

var listsitewithoutfilters = {
  "stackoverflow": "stackoverflow.com",
  "twitch": "twitch.tv"
};
function addlowcontrastfilter(){
	chrome.storage.local.get('sdm_range_value', function(e){
	chrome.storage.local.get('sdm_low_contrast', function(e1){
		var noinsert = false;
		for(url_check in listsitewithoutfilters)
			noinsert=noinsert||(location.host.indexOf(listsitewithoutfilters[url_check])>=0);
		
		var css = (noinsert)?('body{filter:brightness('+e['sdm_range_value']+'%) sepia(10%);}'):('html{filter:brightness('+e['sdm_range_value']+'%) sepia(10%);}');
		
		var style2 = document.createElement('style');
		style2.type = 'text/css';
		style2.id = "sdm_low_contrast";
		if (style2.styleSheet){
		  style2.styleSheet.cssText = css;
		} else {
		  style2.appendChild(document.createTextNode(css));
		}
		
		if(!noinsert && document.getElementById('sdm_low_contrast')==null && e1['sdm_low_contrast']==true)
			head.appendChild(style2);
		else if(document.getElementById('sdm_low_contrast')==null && e1['sdm_low_contrast']==true)
			head.appendChild(style2);
	});
	});
}

function enablepattern(){
	//{
	var css = `:root{--bg-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1NiIgaGVpZ2h0PSIxMDAiPgo8cmVjdCB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiBmaWxsPSIjMWUxZTFlIj48L3JlY3Q+CjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFiMWIxYiIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+CjxwYXRoIGQ9Ik0yOCAwTDI4IDM0TDAgNTBMMCA4NEwyOCAxMDBMNTYgODRMNTYgNTBMMjggMzQiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzJjMmMyYyIgc3Ryb2tlLXdpZHRoPSIyIj48L3BhdGg+Cjwvc3ZnPg==") !important;}`,
	//}
	style4 = document.createElement('style');
	style4.type = 'text/css';
	style4.id = "sdm_enable_pattern";
	if (style4.styleSheet){
	  style4.styleSheet.cssText = css;
	} else {
	  style4.appendChild(document.createTextNode(css));
	}
	var noinsert = false;
	for(url_check in custom)
		noinsert=noinsert||(location.host.indexOf(custom[url_check])>=0);
	if(!noinsert && document.getElementById('sdm_enable_pattern')==null)
		head.appendChild(style4);
}

function removelowcontrastfilter(){
	var sdm_lc_f = document.getElementById('sdm_low_contrast');
	if(sdm_lc_f!=null)
		sdm_lc_f.remove();
}

function disablepattern(){
	var sdm_lc_f = document.getElementById('sdm_enable_pattern');
	if(sdm_lc_f!=null)
		sdm_lc_f.remove();
}

function hexToRgbA(hex, alpha){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(',')+','+alpha+')';
    }
    throw new Error('Bad Hex');
}

function addcustomecolorschemes(){
  var tmp = {};
  var colors = Array("#1a1a1a", "#6e6e6e", "#5a7878", "#78785a", "#d3d3d3", "#d3d3d3", "#add8e6", "#242424");
  for (var i=0; i<=8; i++) tmp['colorschemes_'+i] = "";
  chrome.storage.local.get(tmp, function (e) {
	for(var i=1; i<=8; i++) {
		if(e!==undefined && e!==null) 
			if(i===6)
				colors[i-1] = hexToRgbA(e['colorschemes_'+i], 0.2);
			else if(i===8)
				colors[i-1] = hexToRgbA(e['colorschemes_'+i], 0.95);
			else
				colors[i-1] = hexToRgbA(e['colorschemes_'+i], 1);;
	}
	var css = `
		:root{
			--bg-color:`+colors[0]+`;
			--text-color:`+colors[1]+`;
			--a-color:`+colors[2]+`;
			--a-visited-color:`+colors[3]+`;
			--a-hover-color:`+colors[4]+`;
			--input-border-color:`+colors[5]+`;
			--input-placeholder-color:`+colors[6]+`;
			--dialog-bg-color:`+colors[7]+`;
			--bg-image:linear-gradient(`+colors[0]+`,`+colors[0]+`);
		}
	`;
	style3 = document.createElement('style');
	style3.type = 'text/css';
	style3.id = "dark-mode-custom-color";
	if (style3.styleSheet){
	  style3.styleSheet.cssText = css;
	} else {
	  style3.appendChild(document.createTextNode(css));
	}
	var dmdc = document.getElementById('dark-mode-custom-color');
	if(dmdc!==undefined && dmdc!==null)
		dmdc.remove();
	head.appendChild(style3);
  });
}

var update = function () {
  var tmp = {};
  for (var name in custom) tmp[name] = true;
  for (var i = 1; i <= n_dark_themes; i++) tmp['dark_' + i] = false;
  tmp["dark_1"] = true;
  tmp["whitelist"] = [];
  tmp["state"] = "OFF";
  chrome.storage.local.get(tmp, function (e) {
    var id = null;
    var host = hostname(tab);
    /* disable dark mode for chrome newtab page */
    if (tab.indexOf("/chrome/newtab") !== -1) return edit('', '');
    for (var i = 0; i < e.whitelist.length; i++) {
      if (e.whitelist[i] === host) return edit('', '');
    }
    /*  */
    for (var i = 1; i <= n_dark_themes; i++) {
      if (e['dark_' + i]) {
        id = i;
        break;
      }
    }
    /*  */
    for (var name in custom) {
      if (e[name]) {
        if (tab.indexOf(custom[name]) !== -1) {
          var href = e.state === "ON" ? (chrome.runtime.getURL("data/content_script/custom/" + name + ".css")) : '';
          edit(href, '');
          return;
        }
      }
    }
    /*  */
    if (e.state === "ON") {
      if (id) {
        var href = chrome.runtime.getURL('data/content_script/general/dark_' + id + '.css');
        if (id === 34) chrome.storage.local.get({"custom": ''}, function (e) {edit('', e.custom)});
        else {edit(href, '');}
      } else edit('', '');
    } else edit('', '');
  });
  var _thread = setInterval(function(){
	  if(document.body!==null&&document.body!==undefined){
		clearInterval(_thread);
		try{
			document.body.addEventListener("mousedown", function sdmmousedownevent(eventData){
				if(eventData.which===3)
					chrome.runtime.sendMessage({"sdm_update_event":1, "url_host":location.hostname}, function(response){if(chrome.runtime.lastError){}});
			});
			if(iseventfired)
				document.body.addEventListener("keydown", function sdmkeydownevent(eventData){
					if(eventData.ctrlKey && event.shiftKey && eventData.keyCode == 69 && !(eventData.altKey || eventData.metaKey)){//Ctrl+Shift+E
						chrome.runtime.sendMessage({"sdm_update_event":2, "url_host":location.hostname}, function(response){if(chrome.runtime.lastError){}});
						iseventfired = false;
					}
					else if(eventData.ctrlKey && eventData.shiftKey && eventData.keyCode == 83 && !(eventData.altKey || eventData.metaKey)){//Ctrl+Shift+S
						chrome.storage.local.get("state", function(e1){
							var curr_state = e1['state']==='ON'?'OFF':'ON';
							chrome.storage.local.set({"sdm_auto_time": false}, function(){});
							chrome.storage.local.set({"state":curr_state}, function(e2){update();});
							if(curr_state==="OFF")
								removelowcontrastfilter();
						});
					}
			});
		}catch(exception){};
	  }
  },10);
};

var init = function (e) {
  if (e) tab = e;
  update();
  if(chrome.runtime.lastError){}
};

var observer = new MutationObserver(function (e) {
  var link_tmp = document.getElementById("dark-mode");
  if (!link_tmp) {
    if (head) head.appendChild(link);
  }
  /*  */
  observer.disconnect();
});

if (window === window.top) update();
else chrome.runtime.sendMessage({"message": "top"}, init);

chrome.storage.onChanged.addListener(update);
observer.observe(document, {"childList": true, "subtree": true});