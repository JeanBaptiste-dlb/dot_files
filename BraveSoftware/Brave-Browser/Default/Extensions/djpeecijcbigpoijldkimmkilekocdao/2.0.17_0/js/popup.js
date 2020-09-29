!function(e){var t={};function n(s){if(t[s])return t[s].exports;var r=t[s]={i:s,l:!1,exports:{}};return e[s].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,s){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:s})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(s,r,function(t){return e[t]}.bind(null,r));return s},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=40)}({0:function(e,t,n){"use strict";function s(e){if(e){const t=e.closest(".alerte");t&&t.parentNode&&t.parentNode.removeChild(t)}}Object.defineProperty(t,"__esModule",{value:!0}),t.hideAlerte=s,t.alerte=function(e,t,n={}){let r={backdrop:!0,buttons:[{text:chrome.i18n.getMessage("ok"),callback:null}],targetElement:null};r=Object.assign({},r,n);const a=document.createElement("div"),o=document.createElement("div"),i=document.createElement("div"),c=document.createElement("div"),l=document.createElement("div"),d=document.createElement("div");a.className="alerte",i.className="alerte-modal",c.className="alerte-header",c.innerHTML=e,l.className="alerte-body",l.innerHTML=t,d.className="alerte-footer",r.buttons.forEach(e=>{const t=document.createElement("button");t.innerText=e.text,"callback"in e&&e.callback?t.addEventListener("click",t=>e.callback(t)):t.addEventListener("click",e=>s(e.target)),d.appendChild(t)}),o.className="alerte-overlay",r.backdrop&&o.addEventListener("click",e=>s(e.target)),i.appendChild(c),i.appendChild(l),i.appendChild(d),a.appendChild(o),a.appendChild(i),r.targetElement?r.targetElement.appendChild(a):document.body.appendChild(a)}},2:function(e,t,n){"use strict";var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))(function(r,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function i(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(o,i)}c((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(0),a=n(3);class o{getUrl(){return`https://www.${chrome.i18n.getMessage("domainName")}/${this.tomcatInstance()}/${this.servlet}`}tomcatInstance(){return"Scribens"}request(e,t=null){return s(this,void 0,void 0,function*(){return yield fetch(this.getUrl(),{body:this.generateParameters(e),headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"},method:"POST",signal:t||(new AbortController).signal}).then(e=>e.json()).then(e=>(console.log(e),e)).catch(e=>{if(console.log(e),!/^chrome-extension:\/\/.+\/pages\/.+\.html$/.test(window.location.href))throw new a.NetworkError(e.message);[...document.querySelectorAll(".block-spinner")].forEach(e=>{e.classList.remove("block-spinner","disabled");const t=e.querySelector("button.disabled");t&&(t.classList.remove("block-spinner","disabled"),t.removeAttribute("disabled"))}),r.alerte(chrome.i18n.getMessage("error"),`<p>${chrome.i18n.getMessage("something_went_wrong")}</p>\n            <details>\n              <p>${e}</p>\n            </details>\n            `)})})}generateParameters(e){return Object.keys(e).map(t=>`${encodeURIComponent(t)}=${encodeURIComponent(e[t])}`).join("&")}}o.plugin="GoogleChrome",t.HttpBase=o},3:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.NetworkError=class extends Error{constructor(e){super(e),this.name="NetworkError"}}},4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.InactivatedAccount=0]="InactivatedAccount",e[e.InvalidPassword=1]="InvalidPassword",e[e.NotExistingId=2]="NotExistingId",e[e.SessionActive=3]="SessionActive"}(t.AuthErrors||(t.AuthErrors={})),function(e){e[e.P1M=0]="P1M",e[e.P3M=1]="P3M",e[e.P1A=2]="P1A",e[e.P1M_RA=3]="P1M_RA",e[e.P3M_RA=4]="P3M_RA",e[e.P1A_RA=5]="P1A_RA",e[e.TRIAL=6]="TRIAL"}(t.SubscriptionType||(t.SubscriptionType={}))},40:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(0),r=n(8),a=n(41),o=()=>{const e=document.getElementById("popup-wrapper"),t=r.toCamelCase(e.className),n=new a.AvailablePages;chrome.storage.sync.set({lastPage:window.location.href}),"function"==typeof n[t]&&n[t]();const s=e=>{e.preventDefault();const t=e.target;t&&"A"===t.nodeName?window.open(t.getAttribute("href"),"_blank"):window.open(`https://www.${chrome.i18n.getMessage("domainName")}/?key=MonCompte`,"_blank")};[...document.querySelectorAll(".premium-ad")].forEach(e=>{e.addEventListener("click",s)}),[...document.querySelectorAll(".subscription-container")].forEach(e=>{e.closest(".premium-ad")||e.addEventListener("click",s)}),r.scribens_i18n()};"loading"===document.readyState?document.addEventListener("DOMContentLoaded",o):o(),window.addEventListener("message",e=>{const t=e.data||{};switch(t.cmd){case"user-info":chrome.storage.sync.get(["userInfo"],e=>{e&&"userInfo"in e&&window.location.reload()});break;case"user-logout":s.alerte(chrome.i18n.getMessage("error"),t.error,{backdrop:!1,buttons:[{text:"OK",callback(e){window.location.replace("./login.html")}}]})}})},41:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(0),r=n(7),a=n(4),o=n(8),i=n(42);t.AvailablePages=class{constructor(){this.iServlet=new r.IdentificationServlet}registerPage(){o.statePageForm();const e=document.getElementById("button-register"),t=e.closest("form"),n=document.getElementById("name-form"),r=document.getElementById("email-form"),a=document.getElementById("password-form");r.addEventListener("input",e=>{const t=e.target;chrome.storage.sync.set({registerEmail:t.value})}),o.enableRequirements(a),e.addEventListener("click",()=>{t.reportValidity()&&(e.classList.contains("disabled")||(t.classList.add("disabled","block-spinner"),e.classList.add("disabled"),this.iServlet.identifiantExiste(r.value).then(o=>!0===o?(e.classList.remove("disabled"),t.classList.remove("disabled","block-spinner"),s.alerte(chrome.i18n.getMessage("error"),chrome.i18n.getMessage("email_already_exists")),null):!1===o?this.iServlet.newSubscription(r.value,a.value,n.value):null).then(e=>{null!==e&&window.location.replace("./confirmation.html")})))})}confirmationPage(){const e=document.getElementById("button-send-email");o.replacePlaceholderElements("registerEmail",".email-placeholder-element");const t=(t,n,r)=>{this.iServlet.sendMessageEmail(t,r,n).then(n=>{e.classList.contains("disabled")&&(e.classList.remove("disabled","block-spinner"),s.alerte(chrome.i18n.getMessage("confirm_email"),`${chrome.i18n.getMessage("we_sent_email_to")} ${t}`))})},n=(e,t)=>{this.iServlet.estAbonne(e,t).then(e=>!e||Object.keys(a.AuthErrors).includes(e[0])?null:e).then(s=>{s?chrome.storage.sync.set({userInfo:s},()=>{o.clearStatePageForm("register-form"),window.location.replace("./menu.html")}):setTimeout(()=>{n(e,t)},5e3)})};chrome.storage.sync.get(["registerFormData","confirmationEmailOnFirstOpen"],s=>{"confirmationEmailOnFirstOpen"in s&&s.confirmationEmailOnFirstOpen===s.registerFormData.email||(chrome.storage.sync.set({confirmationEmailOnFirstOpen:s.registerFormData.email}),t(s.registerFormData.email,s.registerFormData.name,s.registerFormData.password)),e.addEventListener("click",()=>{e.classList.contains("disabled")||(e.classList.add("disabled","block-spinner"),t(s.registerFormData.email,s.registerFormData.name,s.registerFormData.password))}),n(s.registerFormData.email,s.registerFormData.password)})}loginPage(){o.statePageForm();const e=document.getElementById("button-login"),t=e.closest("form"),n=document.getElementById("email-form"),r=document.getElementById("password-form");e.addEventListener("click",()=>{t.reportValidity()&&(e.classList.contains("disabled")||(t.classList.add("disabled","block-spinner"),e.classList.add("disabled"),this.iServlet.estAbonne(n.value,r.value).then(n=>!n||Object.keys(a.AuthErrors).includes(n[0])?(e.classList.remove("disabled"),t.classList.remove("disabled","block-spinner"),s.alerte(chrome.i18n.getMessage("error"),n?chrome.i18n.getMessage(n[0]):chrome.i18n.getMessage("something_went_wrong")),null):n).then(e=>{e&&chrome.storage.sync.set({userInfo:e},()=>{o.clearStatePageForm(t),window.location.replace("./menu.html")})})))})}menuPage(){chrome.storage.sync.get(["userInfo"],e=>{i.showRemainingSubscription(e.userInfo)})}supportPage(){o.statePageForm();const e=document.getElementById("button-support"),t=e.closest("form"),n=document.getElementById("message-form");n.addEventListener("input",e=>{e.target.setCustomValidity("")}),n.addEventListener("invalid",e=>{e.target.setCustomValidity(" ")}),e.addEventListener("click",()=>{if(!t.reportValidity())return void s.alerte(chrome.i18n.getMessage("missing_text"),chrome.i18n.getMessage("please_fill_fields"));if(e.classList.contains("disabled"))return;t.classList.add("disabled","block-spinner"),e.classList.add("disabled");const r=n.value.replace(/\r?\n/g,"<br>");chrome.storage.sync.get(["userInfo"],n=>{const s=n.userInfo[7]||"-",a=n.userInfo[2]||n.userInfo[1]||"-",i=`<p>[From GoogleChrome]<br><br>${r}</p>`;this.iServlet.sendSupportEmail(s,a,i).then(n=>{t.reset(),e.classList.remove("disabled"),t.classList.remove("disabled","block-spinner"),o.clearStatePageForm(t),window.location.replace("./support-thanks.html")})})})}supportThanksPage(){const e=document.getElementById("button-support-thanks");o.replacePlaceholderElements("userInfo",".name-placeholder-element",[2,1]),e.addEventListener("click",()=>{e.classList.add("disabled","block-spinner"),window.location.replace("./menu.html")})}accountViewPage(){const e=document.getElementById("account-name"),t=document.getElementById("account-email"),n=document.getElementById("account-password"),r=document.getElementById("button-account-exit");chrome.storage.sync.get(["userInfo"],s=>{e.innerText=s.userInfo[2]||"-",t.innerText=s.userInfo[7]||"-",n.innerText="123456".replace(/./g,"•"),i.showRemainingSubscription(s.userInfo)}),r.addEventListener("click",()=>{s.alerte(chrome.i18n.getMessage("logout"),chrome.i18n.getMessage("are_you_sure"),{buttons:[{text:chrome.i18n.getMessage("cancel")},{text:chrome.i18n.getMessage("yes"),callback(e){s.hideAlerte(e.target),r.classList.add("disabled","blocks-spinner"),chrome.storage.sync.clear(),window.location.replace("./login.html")}}]})})}accountEditPage(){const e=document.getElementById("account-name"),t=document.getElementById("account-email"),n=document.getElementById("account-password"),s=document.getElementById("button-account-save"),r=document.getElementById("account-form");chrome.storage.sync.get(["userInfo"],a=>{e.value=a.userInfo[2],t.value=a.userInfo[7],n.value=a.userInfo[8],e.addEventListener("input",()=>{e.required=e.value!==a.userInfo[2]}),t.addEventListener("input",()=>{t.required=t.value!==a.userInfo[7],t.required?t.setAttribute("pattern",".+@.+.\\w+"):t.removeAttribute("pattern")}),n.addEventListener("input",()=>{n.required=n.value!==a.userInfo[8],n.required?n.setAttribute("pattern","^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*_=+-])(?!.*['|\\\\,]).{6,}$"):n.removeAttribute("pattern")}),o.enableRequirements(n),s.addEventListener("click",()=>{if(!r.reportValidity())return;if(s.classList.contains("disabled"))return;r.classList.add("disabled","block-spinner"),s.classList.add("disabled");const o=[];a.userInfo[2]!==e.value&&o.push({dataKey:2,key:"Prenom",value:e.value}),a.userInfo[8]!==n.value&&o.push({dataKey:8,key:"MotDePasse",value:n.value}),a.userInfo[7]!==t.value&&o.push({dataKey:7,key:"Identifiant",value:t.value}),o.length?this.iServlet.majData(a.userInfo[7],o[0].key,o[0].value).then(e=>(e&&(a.userInfo[o[0].dataKey]=o[0].value),void 0!==o[1]?this.iServlet.majData(a.userInfo[7],o[1].key,o[1].value):null)).then(e=>(e&&(a.userInfo[o[1].dataKey]=o[1].value),void 0!==o[2]?this.iServlet.majData(a.userInfo[7],o[2].key,o[2].value):null)).then(e=>{e&&(a.userInfo[o[2].dataKey]=o[2].value),chrome.storage.sync.set({userInfo:a.userInfo},()=>{window.location.replace("./account-view.html")})}):window.location.replace("./account-view.html")})})}settingsPage(){const e=chrome.runtime.getManifest();document.getElementById("settings-form").dataset.lang=e.default_locale;const t={RefOrth:0,ShowUPSol:1,UsBr:-1,RepMin:3,GapRep:3,AllWords:0,FamilyWords:0,MinPhLg:30,MinPhCt:5,Ttr:250,Tts:150};chrome.storage.sync.get(["settingsFormData","userInfo"],n=>{const s=document.getElementById("settings-form");if("fr"===e.default_locale&&!("DefaultLanguage"in n.settingsFormData)){const e=document.querySelector('select[name="DefaultLanguage"]');Array.from(e.childNodes).forEach(e=>{e.selected="fr"===e.value})}o.statePageForm(n.settingsFormData||{}),"userInfo"in n&&s.addEventListener("change",e=>{const s=e.target;if(Object.keys(t).includes(s.name)){const e=s.closest(".form-group");e.classList.add("disabled","block-spinner");const r=Object.assign({},t),a=o.stringToObject(n.userInfo[16]);switch(Object.keys(a).forEach(e=>{r[e]=a[e]||t[e]}),s.tagName){case"INPUT":"checkbox"===s.type?r[s.name]=s.checked?1:0:r[s.name]=s.value;break;case"TEXTAREA":r[s.name]=s.value;break;case"SELECT":r[s.name]=s.options[s.selectedIndex].value}this.iServlet.majData(n.userInfo[7],"Settings",o.objectToString(r)).then(t=>{n.userInfo[16]=o.objectToString(r),chrome.storage.sync.set({userInfo:n.userInfo}),e.classList.remove("disabled","block-spinner")})}})})}passwordRecoveryPage(){o.statePageForm();const e=document.getElementById("button-recovery"),t=e.closest("form"),n=document.getElementById("email-form");e.addEventListener("click",()=>{t.reportValidity()&&(e.classList.contains("disabled")||(t.classList.add("disabled","block-spinner"),e.classList.add("disabled"),this.iServlet.identifiantExiste(n.value).then(e=>e&&!0===e?this.iServlet.sendMessageEmail(n.value,"","","REINIT_MDP"):(s.alerte(chrome.i18n.getMessage("error"),chrome.i18n.getMessage("email_is_not_associated")),null)).then(n=>{if(!n)return e.classList.remove("disabled"),t.classList.remove("disabled","block-spinner"),null;chrome.storage.sync.set({lastPage:window.location.href.replace(/password-recovery.html$/,"login.html")}),o.clearStatePageForm(t),s.alerte(chrome.i18n.getMessage("password_recovery"),chrome.i18n.getMessage("email_to_reset_password_sent"),{backdrop:!1,buttons:[{text:chrome.i18n.getMessage("ok"),callback(e){window.location.replace("./login.html")}}]})})))})}}},42:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const s=n(4);t.showRemainingSubscription=function(e){const t=new Date(e[10]).getTime(),n=(new Date).getTime();let r="",a=!1,o=!1,i=!1;if(isNaN(t)||isNaN(n))o=!0;else{const e=t-n;if(e>=36e5){const t=Math.round(e/31536e6),n=Math.round(e/2592e6),s=Math.round(e/864e5),a=Math.round(e/36e5);t>1?r=`${t} ${1===t?chrome.i18n.getMessage("year_remaning"):chrome.i18n.getMessage("years_remaning")}`:n>1?r=`${n} ${1===n?chrome.i18n.getMessage("month_remaning"):chrome.i18n.getMessage("months_remaning")}`:s?r=`${s} ${1===s?chrome.i18n.getMessage("day_remaning"):chrome.i18n.getMessage("days_remaning")}`:a&&(r=`${a} ${1===a?chrome.i18n.getMessage("hour_remaning"):chrome.i18n.getMessage("hours_remaning")}`)}else o=!0;e<=6048e5&&(a=!0)}"TRIAL"===e[9]?(i=!0,r=chrome.i18n.getMessage("not_activated")):/_EXPIRED$/.test(e[9])&&(o=!0),[...document.querySelectorAll(".subscription-remaining")].forEach(t=>{const n=t.closest(".subscription-container"),c=n.querySelector(".abonnement-premium"),l=n.querySelector(".button-premium-plans"),d=n.querySelector(".subscription-type");(a||o)&&t.classList.add("text-red"),o&&(r=chrome.i18n.getMessage("expired"),c&&(c.style.textDecoration="line-through"),l&&(l.innerHTML=chrome.i18n.getMessage("become_premium_user"))),d&&(Object.values(s.SubscriptionType).includes(e[9])&&(d.innerHTML=chrome.i18n.getMessage(e[9])),i&&(n.querySelector("label").innerHTML=chrome.i18n.getMessage("free_version")),o&&(n.querySelector("label").style.textDecoration="line-through")),t.innerHTML=r})}},7:function(e,t,n){"use strict";var s=this&&this.__awaiter||function(e,t,n,s){return new(n||(n=Promise))(function(r,a){function o(e){try{c(s.next(e))}catch(e){a(e)}}function i(e){try{c(s.throw(e))}catch(e){a(e)}}function c(e){e.done?r(e.value):new n(function(t){t(e.value)}).then(o,i)}c((s=s.apply(e,t||[])).next())})};Object.defineProperty(t,"__esModule",{value:!0});const r=n(2);t.IdentificationServlet=class extends r.HttpBase{constructor(){super(...arguments),this.servlet="Identification_Servlet"}estAbonne(e,t){return s(this,void 0,void 0,function*(){return this.request({FunctionName:"EstAbonne",Id:e,Password:t,plugin:r.HttpBase.plugin})})}identifiantExiste(e){return s(this,void 0,void 0,function*(){return this.request({FunctionName:"IdentifiantExiste",Email:e})})}newSubscription(e,t,n){return s(this,void 0,void 0,function*(){const s=chrome.runtime.getManifest();return this.request({FunctionName:"NewSubscription",Identifiant:e,MotDePasse:t,Prenom:n,Language:s.default_locale,plugin:r.HttpBase.plugin})})}sendMessageEmail(e,t,n,r="CONFIRMATION_INSCRIPTION"){return s(this,void 0,void 0,function*(){const s=chrome.runtime.getManifest();return this.request({FunctionName:"SendMessageEmail",IdMail:r,LangId:s.default_locale,EMail:e,MotDePasse:t,Prenom:n})})}sendSupportEmail(e,t,n){return s(this,void 0,void 0,function*(){return this.request({FunctionName:"SendSupportEmail",Id:e,Name:t,Message:n})})}majData(e,t,n){return s(this,void 0,void 0,function*(){return this.request({FunctionName:"MajData",TableName:"abonnement_client",DataName:t,DataValue:n,Id:e})})}signalSessionActive(e){return s(this,void 0,void 0,function*(){return this.request({FunctionName:"SignalSessionActive",Id:e,plugin:r.HttpBase.plugin})})}}},8:function(e,t,n){"use strict";function s(e){return e.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g,(e,t)=>t.toUpperCase())}function r(e,t){if(e)switch(e.tagName){case"INPUT":"checkbox"===e.type?e.checked=Boolean(Number(t)):e.value=t;break;case"TEXTAREA":e.value=t;break;case"SELECT":[...e.options].some((n,s)=>{n.value===t&&(e.selectedIndex=s)})}}Object.defineProperty(t,"__esModule",{value:!0}),t.stringToObject=function(e){return e&&/|/.test(e)?e.split("|").map(e=>{const t=e.split(":"),n={},s=String(t[0]).trim(),r=String(t[1]).trim();return n[s]=r,n}).reduce((e,t)=>Object.assign({},e,t),{}):{}},t.objectToString=function(e){return Object.keys(e).map(t=>`${t}: ${e[t]}`).join("|").replace(/\s+/g,"")},t.scribens_i18n=function(){[...document.querySelectorAll("[data-scribens-i18n]")].forEach(e=>{let t="";if(/^attr/.test(e.dataset.scribensI18n)){const[t,n]=e.dataset.scribensI18n.split("|")}else t=e.dataset.scribensI18n;if(/^html/.test(e.dataset.scribensI18n))e.innerHTML=chrome.i18n.getMessage(e.dataset.scribensI18n);else if(/^attr/.test(e.dataset.scribensI18n)){const[t,n]=e.dataset.scribensI18n.split("|"),[,s]=t.split(":");e.setAttribute(s,chrome.i18n.getMessage(n))}else e.innerText=chrome.i18n.getMessage(e.dataset.scribensI18n)})},t.enableRequirements=function(e){e.addEventListener("input",e=>{const t=e.target,n=t.parentNode.querySelector(".requirements");t.setCustomValidity(""),n&&[...n.querySelectorAll("div[data-validation]")].forEach(e=>{const n=new RegExp(e.getAttribute("data-validation")),s=e.querySelector("span"),r=e.getAttribute("data-string-raw"),a=e.getAttribute("data-reverse-result"),o=r?String.raw`${t.value}`:t.value;let i=n.test(o);a&&(i=!i),i?(s.innerText="√",e.className="text-green"):(s.innerText="x",e.className="text-red")})}),e.addEventListener("invalid",e=>{const t=e.target;t.parentNode.querySelector(".requirements")&&(t.dispatchEvent(new Event("input")),t.setCustomValidity(" "))}),e.addEventListener("focus",e=>{const t=e.target.parentNode.querySelector(".requirements");t&&(t.classList.add("show-requirements"),t.style.top=`${-Math.abs(t.getBoundingClientRect().height+3)}px`)},!0),e.addEventListener("blur",e=>{const t=e.target.parentNode.querySelector(".requirements");t&&t.classList.remove("show-requirements")},!0)},t.toCamelCase=s,t.replacePlaceholderElements=function(e,t,n=null,s=null){chrome.storage.sync.get([e],r=>{[...(s||document).querySelectorAll(t)].forEach(t=>{if(n)if(n instanceof Array)for(let s=0;s<n.length;s+=1){const a=n[s];if(r[e][a]){t.innerText=r[e][a];break}}else t.innerText=r[e][n];else t.innerText=r[e]})})},t.assignElementValue=r,t.statePageForm=function(e={},t=null){[...(t||document).querySelectorAll("form[data-name]")].forEach(t=>{const n={},a=s(`${t.getAttribute("data-name")}-data`);n[a]=Object.assign({},e),t.addEventListener("change",()=>{[...t.querySelectorAll("input, select, textarea")].filter(e=>e.name).forEach(e=>{n[a][e.name]="checkbox"===e.type?e.checked:e.value}),Object.keys(n[a]).length>0&&chrome.storage.sync.set(n)}),chrome.storage.sync.get(a,e=>{e&&e[a]&&Object.keys(e[a]).forEach(n=>{r(t.querySelector(`[name="${n}"]`),e[a][n])})})})},t.clearStatePageForm=function(e){const t=s(`${e instanceof Element?e.getAttribute("data-name"):e}-data`);chrome.storage.sync.remove(t)}}});