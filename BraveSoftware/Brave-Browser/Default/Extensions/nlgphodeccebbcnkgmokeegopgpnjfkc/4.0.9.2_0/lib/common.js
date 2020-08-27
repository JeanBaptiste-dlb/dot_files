window.setTimeout(function () {
  if (app.loadReason === "install") {
    app.tab.open("https://sites.google.com/view/crx/sdm", true);
	//app.tab.open("http://www.videoeffects.org", true);
	chrome.runtime.openOptionsPage();
	setRatingTime();
	//reload all pages after installing the extension
	chrome.tabs.query({status:'complete'}, (tabs)=>{
	tabs.forEach((tab)=>{
		if(tab.url){
			chrome.tabs.update(tab.id,{url: tab.url});
		 }
		});
	});
	//Turn on Dark mode
	chrome.storage.local.set({"state": "ON"}, function () {});
	config.addon.state = "ON";
	update(config.addon.state);
  }
}, 1000);

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

var update = function (state) {
  app.button.label = 'Super Dark Mode: ' + (state!==undefined?state.toUpperCase():"OFF") + '  (Ctrl+Shift+S)';;
  app.button.icon = {
    "path": {
      "16": '../../data/icons/' + (state!==undefined?state.toLowerCase():"off")  + '/16.png',
      "32": '../../data/icons/' + (state!==undefined?state.toLowerCase():"off")  + '/32.png',
      "48": '../../data/icons/' + (state!==undefined?state.toLowerCase():"off")  + '/48.png',
      "64": '../../data/icons/' + (state!==undefined?state.toLowerCase():"off")  + '/64.png'
    }
  };
};

app.button.onCommand(function () {
  config.addon.state = config.addon.state === "ON" ? "OFF" : "ON";
  update(config.addon.state);
});

chrome.contextMenus.onClicked.addListener(function (e) {
  if (e.menuItemId === "dark-mode-context-menu") {
	var pageUrl = e.pageUrl;
	checkWhitelist(hostname(pageUrl), function(ok){
		if(!ok){
		  chrome.storage.local.get({"whitelist": []}, function (o) {
			var whitelist = o.whitelist;
			whitelist.push(hostname(pageUrl));
			whitelist = whitelist.filter(function (element, index, array) {return element && array.indexOf(element) === index});
			chrome.storage.local.set({"whitelist": whitelist}, function () {});
		  });
		}else{
		  removeHostFromWhitelist(hostname(pageUrl));
		}
	});
  }
});

function removeHostFromWhitelist(s){
	chrome.storage.local.get("whitelist", function(result){
		for(var i = 0; i< result.whitelist.length; i++)
			if(result.whitelist[i].indexOf(s)>=0){
				result.whitelist.splice(i, 1);
				break;
			};
			chrome.storage.local.set({"whitelist":result.whitelist});
	});
}

function checkWhitelist(s, func){
	chrome.storage.local.get("whitelist", function(result){
		res = false;
		if(result.whitelist!==null && result.whitelist!==undefined)
		for(var i = 0; i< result.whitelist.length; i++)
			if(result.whitelist[i].indexOf(s)>=0){
				res = true;
				break;
			};
		func(res);
	});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if(request.url_host!==null && request.url_host!==undefined && request.sdm_update_event==1)
		checkWhitelist(hostname(request.url_host), function(ok){
			if(!ok){
			  chrome.contextMenus.update("dark-mode-context-menu", {"title": "⛔ Disable Super Dark Mode on this site   (Ctrl+Shift+E)"});
			}else{
			  chrome.contextMenus.update("dark-mode-context-menu", {"title": "❎ Enable Super Dark Mode on this site   (Ctrl+Shift+E)"});
			}
			sendResponse({});
		});
	else if(request.url_host!==null && request.url_host!==undefined && request.sdm_update_event==2){
		var pageUrl = request.url_host;
		checkWhitelist(hostname(pageUrl), function(ok){
			if(!ok){
			  chrome.storage.local.get({"whitelist": []}, function (o) {
				var whitelist = o.whitelist;
				whitelist.push(hostname(pageUrl));
				whitelist = whitelist.filter(function (element, index, array) {return element && array.indexOf(element) === index});
				chrome.storage.local.set({"whitelist": whitelist}, function () {});
			  });
			}else{
			  removeHostFromWhitelist(hostname(pageUrl));
			}
			sendResponse({});
		});
	}
});

window.setTimeout(function () {update(config.addon.state)}, 300);
chrome.contextMenus.create({"contexts": ["page"], "id": "dark-mode-context-menu", "title": "⛔ Disable Super Dark Mode on this site   (Ctrl+Shift+E)"});

function setRatingTime(){
	var d = (new Date()).getTime();
	chrome.storage.local.set({"sdm_time_installed": d}, function(){});
}

var time_rating = window.setInterval(function(){
	chrome.storage.local.get("sdm_time_installed", function(e){
		if(e["sdm_time_installed"]!==undefined){
			var curr = (new Date()).getTime();
			var installed = e["sdm_time_installed"];
			var time_diff = curr - installed;
			if(time_diff>2*24*60*60*1000){
				clearInterval(time_rating);
				app.tab.open("https://sites.google.com/view/crx/rating-sdm", true);
				chrome.storage.local.remove("sdm_time_installed", function(){});
			}
		}
	});
}, 500);
