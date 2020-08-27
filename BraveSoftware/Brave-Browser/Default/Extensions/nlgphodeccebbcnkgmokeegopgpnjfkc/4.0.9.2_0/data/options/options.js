var n_dark_themes = 3;
var link = document.getElementById("dark-mode");
var head = document.documentElement || document.head || document.querySelector("head");
var low_contrast = document.getElementById('low_contrast');
var enablepattern = document.getElementById('enablepattern');
var savecss = document.getElementById('savecss');
var removecss = document.getElementById('removecss');
var customcss = document.getElementById('customcss');
var auto_time = document.getElementById('auto_time');
var start_time = document.getElementById('start_time');
var to_time = document.getElementById('to_time');
var sdm_range = document.getElementById('sdmrange');
var sp_shortcutkey = document.getElementById("sp_shortcutkey");

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
  "vimeo":"vimeo.com",
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

var fill = function () {
  chrome.storage.local.get({"whitelist": [], "state": "OFF", "custom": ''}, function (e) {
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("type", "text/css");
      link.setAttribute("id", "dark-mode");
      link.setAttribute("rel", "stylesheet");
      if (head) head.appendChild(link);
    }
    document.getElementById('whitelist').value = e.whitelist.join(', ');
  });
  chrome.storage.local.get("sdm_auto_time", function (e) {
	auto_time.checked = e['sdm_auto_time'];
  });
};

var handle = function () {
  var id = this.id, checked = this.checked;
  if (id.indexOf("dark_") !== -1) {
    for (var i = 1; i <= n_dark_themes; i++) document.getElementById('dark_'+i).checked = false;
    document.getElementById(id).checked = checked;
  }
  if(document.getElementById('dark_2').checked===true){
	  document.getElementById('custom_color_scheme').style.display = '';
	  clearInterval(timer);
	  var ntheme = document.getElementById('notice_theme')
	  if(ntheme!==undefined)
		  ntheme.style.color = 'orange';
  }
  else
	  document.getElementById('custom_color_scheme').style.display = 'none';
  var tmp = {};
  for (var name in custom) tmp[name] = document.getElementById(name).checked;
  for (var i = 1; i <= n_dark_themes; i++) tmp['dark_'+i] = document.getElementById('dark_'+i).checked;
  for (var i = 1; i <= 8; i++) tmp['colorschemes_'+i] = document.getElementById('customcolor_'+i).value;
  chrome.storage.local.set(tmp, function () {});
};

var restore = function () {
  var tmp = {};
  for (var name in custom) tmp[name] = true;
  document.removeEventListener('DOMContentLoaded', restore, false);
  for (var i = 1; i <= n_dark_themes; i++) tmp['dark_'+i] = false;
  tmp["dark_1"] = true;
  var colors = Array("#1a1a1a", "#6e6e6e", "#5a7878", "#78785a", "#d3d3d3", "#d3d3d3", "#add8e6", "#242424");
  for(var i=1; i<=8; i++) {document.getElementById('customcolor_'+i).value = colors[i-1];}
  for (var i=1; i<=8; i++) tmp['colorschemes_'+i] = colors[i-1];
  chrome.storage.local.get(tmp, function (e) {
    for (var name in custom) document.getElementById(name).checked = e[name];
    for (var i = 1; i <= n_dark_themes; i++) document.getElementById('dark_'+i).checked = e['dark_'+i];
	for(var i=1; i<=8; i++) {if(e['colorschemes_'+i]!==undefined)document.getElementById('customcolor_'+i).value = e['colorschemes_'+i];}
	if(document.getElementById('dark_2').checked===true)
	  document.getElementById('custom_color_scheme').style.display = '';
	else{
	  document.getElementById('custom_color_scheme').style.display = 'none';
	  noticeTheme();
	}
	
  });
};

var load = function () {
  fill();
  window.removeEventListener("load", load, false);
  for (var name in custom) document.getElementById(name).addEventListener('click', handle);
  for (var i = 1; i <= n_dark_themes; i++) document.getElementById('dark_'+i).addEventListener('click', handle);
  for (var i = 1; i <= 8; i++) document.getElementById('customcolor_'+i).addEventListener('change', handle);
  document.getElementById('whitelist').addEventListener("change", function () {
    var whitelist_tmp = [];
    var whitelist = document.getElementById('whitelist').value || '';
    var hosts = whitelist.split(/\s*\,\s*/);
    for (var i = 0; i < hosts.length; i++) whitelist_tmp.push(hostname(hosts[i]));
    whitelist_tmp = whitelist_tmp.filter(function (element, index, array) {return element && array.indexOf(element) === index});
    chrome.storage.local.set({"whitelist": whitelist_tmp}, function () {});
  });
  chrome.storage.local.get("sdm_low_contrast", function(e){
	 low_contrast.checked = e["sdm_low_contrast"]; 
	 sdm_range.disabled = !e["sdm_low_contrast"];
  });
  chrome.storage.local.get("sdm_enable_pattern", function(e){
	 enablepattern.checked = e["sdm_enable_pattern"]; 
  });
  chrome.storage.local.get("sdm_custom_css", function(e){
	 if(e["sdm_custom_css"]!==undefined)
		customcss.value = e["sdm_custom_css"]; 
  });
  chrome.storage.local.get("sdm_auto_time", function(e){
	 auto_time.checked = e["sdm_auto_time"]; 
	 start_time.disabled = !e["sdm_auto_time"];
	 to_time.disabled = !e["sdm_auto_time"];
  });
  chrome.storage.local.get("sdm_start_time", function(e){
	 if(e["sdm_start_time"]!==undefined)
		start_time.value = e["sdm_start_time"]; 
  });
  chrome.storage.local.get("sdm_to_time", function(e){
	 if(e["sdm_to_time"]!==undefined)
		to_time.value = e["sdm_to_time"]; 
  });
  chrome.storage.local.get("sdm_range_value", function(e){
	 if(e["sdm_range_value"]!==undefined){
		sdm_range.value = e["sdm_range_value"]; 
		sdm_range.title = ''+e["sdm_range_value"]+'%';
	 }
  });
};

chrome.storage.onChanged.addListener(fill);
window.addEventListener("load", load, false);
document.addEventListener('DOMContentLoaded', restore, false);
/*news*/

low_contrast.addEventListener('change', function(){
	sdm_range.disabled = !this.checked;
	chrome.storage.local.set({"sdm_low_contrast": this.checked}, function(){});
	chrome.storage.local.get("sdm_range_value", function(e){
		if(e["sdm_range_value"]==undefined){
			sdm_range.value = 75;
			chrome.storage.local.set({"sdm_range_value": 75}, function(){});
			sdm_range.title = '75%';
		}else{
			sdm_range.value = e["sdm_range_value"];
			sdm_range.title = ''+e["sdm_range_value"]+'%';
		}
	});
});
enablepattern.addEventListener('change', function(){
	chrome.storage.local.set({"sdm_enable_pattern": this.checked}, function(){});
});
savecss.addEventListener('click', function(){
	this.value = "       Saved        ";
	chrome.storage.local.set({"sdm_custom_css": customcss.value}, function(){});
	setTimeout(function(){savecss.value = "Save and Apply";}, 3000);
});
removecss.addEventListener('click', function(){
	this.value = "   Removed   ";
	customcss.value = "";
	chrome.storage.local.set({"sdm_custom_css": ""}, function(){});
	setTimeout(function(){removecss.value = "Remove All";}, 3000);
});
document.getElementById('btresetcolor').addEventListener('click', function(){
  this.value = 'Restoring...';
  var colors = Array("#1a1a1a", "#6e6e6e", "#5a7878", "#78785a", "#d3d3d3", "#d3d3d3", "#add8e6", "#242424");
  for(var i=1; i<=8; i++) document.getElementById('customcolor_'+i).value = colors[i-1];
  var tmp = {};
  for (var i = 1; i <= 8; i++) tmp['colorschemes_'+i] = document.getElementById('customcolor_'+i).value;
  chrome.storage.local.set(tmp, function () {});
  setTimeout(function(){document.getElementById('btresetcolor').value='Reset to Default';},1000);
});

var timer;

function noticeTheme(){
	var ntheme = document.getElementById('notice_theme');
	var nthemebordercolor = ['red', 'green', 'yellow', 'pink', 'orange'];
	timer = setInterval(function(){
		n = Math.round(Math.random()*nthemebordercolor.length);
		ntheme.style.color = nthemebordercolor[n];
	}, 600);
}
start_time.addEventListener('change', function(){
	chrome.storage.local.set({"sdm_start_time": this.value}, function(){});
});
to_time.addEventListener('change',function(){
	chrome.storage.local.set({"sdm_to_time": this.value}, function(){});
});
auto_time.addEventListener('change', function(){
	chrome.storage.local.set({"sdm_auto_time": this.checked}, function(){});
	start_time.disabled = !this.checked;
	to_time.disabled = !this.checked;
	var stime = start_time.value;
	var ttime = to_time.value;
	chrome.storage.local.set({"sdm_start_time": stime}, function(){});
	chrome.storage.local.set({"sdm_to_time": ttime}, function(){});
});

sdm_range.addEventListener('change', function(){
	chrome.storage.local.set({"sdm_range_value": this.value}, function(){});
	sdm_range.title = ''+this.value+'%';
});

sp_shortcutkey.addEventListener('click', function(){
	//window.open('chrome://extensions/shortcuts','_blank');
	chrome.tabs.create({
        url: "chrome://extensions/shortcuts",
        active: true
    });
});