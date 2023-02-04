(()=>{"use strict";var e={3914:function(e,t,n){var r,o,i=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)});Object.defineProperty(t,"__esModule",{value:!0});var s=n(38300),a=((o={})[s.ProviderErrorMessage.USER_REJECTED_REQUEST]=4001,o[s.ProviderErrorMessage.UNAUTHORIZED]=4100,o[s.ProviderErrorMessage.UNSUPPORTED_METHOD]=4200,o[s.ProviderErrorMessage.DISCONNECTED]=4900,o[s.ProviderErrorMessage.CHAIN_DISCONNECTED]=4901,o),c=function(e){function t(t,n){var r=e.call(this,t)||this;return r.name=s.ErrorType.PROVIDER,r.code=a[t],n&&(r.data=n),r}return i(t,e),t}(Error);t.default=c},38300:(e,t)=>{var n,r,o,i;Object.defineProperty(t,"__esModule",{value:!0}),t.ErrorType=t.ProviderErrorMessage=t.NETWORK=t.INSTALL=t.RONIN_EVENT=t.REQUEST_TYPES=void 0,(i=t.REQUEST_TYPES||(t.REQUEST_TYPES={})).ASK_PROVIDER_FROM_CONTENT_SCRIPT="ask_provider_from_content_script",i.RONIN_WALLET_ENABLE_REQUEST="ronin_wallet_enable_request",i.ASK_PROVIDER_FROM_POPUP="ask_provider_from_popup",(o=t.RONIN_EVENT||(t.RONIN_EVENT={})).ACCOUNT_CHANGED="account_changed",o.CHAIN_ID_CHANGED="chain_id_changed",o.UNLOCK_CHANGED="unlock_changed",t.INSTALL="install",t.NETWORK="network",(r=t.ProviderErrorMessage||(t.ProviderErrorMessage={})).USER_REJECTED_REQUEST="User Rejected Request",r.UNAUTHORIZED="Unauthorized",r.UNSUPPORTED_METHOD="Unsupported Method",r.DISCONNECTED="Disconnected",r.CHAIN_DISCONNECTED="Chain Disconnected",(n=t.ErrorType||(t.ErrorType={})).PROVIDER="ProviderError",n.RPC="JsonRpcError"},76732:function(e,t,n){var r,o=this&&this.__extends||(r=function(e,t){return r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])},r(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),i=this&&this.__assign||function(){return i=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e},i.apply(this,arguments)},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=s(n(3914)),c=n(38300),u=s(n(39971)),l=n(11461),d=n(10519),f=function(e){function t(t){var n=e.call(this)||this;return n._isConnected=!0,n._isUnlocked=!0,n._roninEvent=t,n.request=n.request.bind(n),n.sendAsync=n.sendAsync.bind(n),n.initInpageEventListener=n.initInpageEventListener.bind(n),n}return o(t,e),t.prototype.initInpageEventListener=function(){var e=this;window.addEventListener("message",(function(t){d.isFromContentScript(t)&&t.data.roninEvent===c.RONIN_EVENT.ACCOUNT_CHANGED&&e.handleAccountsChanged(t.data.detail?[t.data.detail.account]:[])})),window.addEventListener("message",(function(t){d.isFromContentScript(t)&&t.data.roninEvent===c.RONIN_EVENT.CHAIN_ID_CHANGED&&e.handleChainChanged(t.data.detail.chainId)})),window.addEventListener("message",(function(t){if(d.isFromContentScript(t)&&t.data.roninEvent===c.RONIN_EVENT.UNLOCK_CHANGED){var n=t.data.detail,r=n.isUnlocked,o=n.selectedAccount;e.handleUnlockChanged(r,o?[o]:[])}}))},t.prototype.enable=function(){var e=new CustomEvent(c.REQUEST_TYPES.RONIN_WALLET_ENABLE_REQUEST);window.dispatchEvent(e)},t.prototype.sendAsync=function(e,t){var n=e.id,r=new CustomEvent(c.REQUEST_TYPES.ASK_PROVIDER_FROM_CONTENT_SCRIPT,{detail:{payload:e}});window.dispatchEvent(r);var o=function(e){d.isFromContentScript(e)&&e.data.detail.id===n&&(t(e.data.error,e.data.detail),window.removeEventListener("message",o))};window.addEventListener("message",o)},t.prototype.request=function(e){var t=this;return new Promise((function(n,r){var o=e.method;if(o&&o.length&&"string"==typeof o){var s=""+(Date.now()+Math.random()),u=new CustomEvent(c.REQUEST_TYPES.ASK_PROVIDER_FROM_CONTENT_SCRIPT,{detail:{payload:i(i({},e),{id:s,jsonrpc:"2.0"})}});window.dispatchEvent(u);var l=function(e){if(d.isFromContentScript(e)&&e.data.detail.id===s){if(e.data.error){var o=t.serializedError(e.data.error);r(o)}window.removeEventListener("message",l),n(e.data.detail.result)}};window.addEventListener("message",l)}else r(new a.default(c.ProviderErrorMessage.UNSUPPORTED_METHOD,e))}))},t.prototype.serializedError=function(e,t){return Object.values(c.ProviderErrorMessage).includes(e.message)?new a.default(e.message,t):e},t.prototype.handleConnect=function(e){this._isConnected||(this._isConnected=!0,this.emit(l.EIP1193Event.CONNECT,{chainId:e}))},t.prototype.handleDisconnect=function(){this._isConnected&&(this._isConnected=!1,this._isUnlocked=!1,this.emit(l.EIP1193Event.DISCONNECT))},t.prototype.handleAccountsChanged=function(e){this.emit(l.EIP1193Event.ACCOUNTS_CHANGED,e),this._roninEvent.dispatchEvent(new Event(c.RONIN_EVENT.ACCOUNT_CHANGED))},t.prototype.handleChainChanged=function(e){this.handleConnect(e),this.emit(l.EIP1193Event.CHAIN_CHANGED,e)},t.prototype.handleUnlockChanged=function(e,t){void 0===t&&(t=[]),e!==this._isUnlocked&&(this._isUnlocked=e,this.handleAccountsChanged(t))},t}(u.default);t.default=f},67749:function(e,t,n){var r=this&&this.__awaiter||function(e,t,n,r){return new(n||(n=Promise))((function(o,i){function s(e){try{c(r.next(e))}catch(e){i(e)}}function a(e){try{c(r.throw(e))}catch(e){i(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(s,a)}c((r=r.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var n,r,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=i(n(76732)),a=new EventTarget,c=new s.default(a);c.initInpageEventListener();var u={provider:c,roninEvent:a};window.ronin=u,r(void 0,void 0,void 0,(function(){return o(this,(function(e){return window.postMessage({direction:"check-whitelist",message:document.domain},"*"),window.addEventListener("message",(function(e){e.source===window&&e.data&&e.data.direction})),[2]}))}))},11461:(e,t)=>{var n;Object.defineProperty(t,"__esModule",{value:!0}),t.EIP1193Event=void 0,(n=t.EIP1193Event||(t.EIP1193Event={})).CONNECT="connect",n.DISCONNECT="disconnect",n.ACCOUNTS_CHANGED="accountsChanged",n.CHAIN_CHANGED="chainChanged"},10519:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.isFromContentScript=void 0,t.isFromContentScript=function(e){return e.source===window&&e.data&&"from-ronin-content-script"===e.data.direction}},39971:e=>{const t="object"==typeof Reflect?Reflect:null,n=t&&"function"==typeof t.apply?t.apply:function(e,t,n){return Function.prototype.apply.call(e,t,n)};let r;r=t&&"function"==typeof t.ownKeys?t.ownKeys:Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:function(e){return Object.getOwnPropertyNames(e)};const o=Number.isNaN||function(e){return e!=e};function i(){i.init.call(this)}e.exports=i,e.exports.once=function(e,t){return new Promise((function(n,r){function o(n){e.removeListener(t,i),r(n)}function i(){"function"==typeof e.removeListener&&e.removeListener("error",o),n([].slice.call(arguments))}v(e,t,i,{once:!0}),"error"!==t&&function(e,t,n){"function"==typeof e.on&&v(e,"error",t,{once:!0})}(e,o)}))},i.EventEmitter=i,i.prototype._events=void 0,i.prototype._eventsCount=0,i.prototype._maxListeners=void 0;let s=10;function a(e){if("function"!=typeof e)throw new TypeError('The "listener" argument must be of type Function. Received type '+typeof e)}function c(e){return void 0===e._maxListeners?i.defaultMaxListeners:e._maxListeners}function u(e,t,n,r){let o,i,s;if(a(n),i=e._events,void 0===i?(i=e._events=Object.create(null),e._eventsCount=0):(void 0!==i.newListener&&(e.emit("newListener",t,n.listener?n.listener:n),i=e._events),s=i[t]),void 0===s)s=i[t]=n,++e._eventsCount;else if("function"==typeof s?s=i[t]=r?[n,s]:[s,n]:r?s.unshift(n):s.push(n),o=c(e),o>0&&s.length>o&&!s.warned){s.warned=!0;const n=new Error("Possible EventEmitter memory leak detected. "+s.length+" "+String(t)+" listeners added. Use emitter.setMaxListeners() to increase limit");n.name="MaxListenersExceededWarning",n.emitter=e,n.type=t,n.count=s.length,u=n,console&&console.warn&&console.warn(u)}var u;return e}function l(){if(!this.fired)return this.target.removeListener(this.type,this.wrapFn),this.fired=!0,0===arguments.length?this.listener.call(this.target):this.listener.apply(this.target,arguments)}function d(e,t,n){const r={fired:!1,wrapFn:void 0,target:e,type:t,listener:n},o=l.bind(r);return o.listener=n,r.wrapFn=o,o}function f(e,t,n){const r=e._events;if(void 0===r)return[];const o=r[t];return void 0===o?[]:"function"==typeof o?n?[o.listener||o]:[o]:n?function(e){const t=new Array(e.length);for(let n=0;n<t.length;++n)t[n]=e[n].listener||e[n];return t}(o):h(o,o.length)}function p(e){const t=this._events;if(void 0!==t){const n=t[e];if("function"==typeof n)return 1;if(void 0!==n)return n.length}return 0}function h(e,t){const n=new Array(t);for(let r=0;r<t;++r)n[r]=e[r];return n}function v(e,t,n,r){if("function"==typeof e.on)r.once?e.once(t,n):e.on(t,n);else{if("function"!=typeof e.addEventListener)throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type '+typeof e);e.addEventListener(t,(function o(i){r.once&&e.removeEventListener(t,o),n(i)}))}}Object.defineProperty(i,"defaultMaxListeners",{enumerable:!0,get:function(){return s},set:function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received '+e+".");s=e}}),i.init=function(){void 0!==this._events&&this._events!==Object.getPrototypeOf(this)._events||(this._events=Object.create(null),this._eventsCount=0),this._maxListeners=this._maxListeners||void 0},i.prototype.setMaxListeners=function(e){if("number"!=typeof e||e<0||o(e))throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received '+e+".");return this._maxListeners=e,this},i.prototype.getMaxListeners=function(){return c(this)},i.prototype.emit=function(e){const t=[];for(var r=1;r<arguments.length;r++)t.push(arguments[r]);let o="error"===e;const i=this._events;if(void 0!==i)o=o&&void 0===i.error;else if(!o)return!1;if(o){let e;if(t.length>0&&(e=t[0]),e instanceof Error)throw e;const n=new Error("Unhandled error."+(e?" ("+e.message+")":""));throw n.context=e,n}const s=i[e];if(void 0===s)return!1;if("function"==typeof s)n(s,this,t);else{const e=s.length,o=h(s,e);for(r=0;r<e;++r)n(o[r],this,t)}return!0},i.prototype.addListener=function(e,t){return u(this,e,t,!1)},i.prototype.on=i.prototype.addListener,i.prototype.prependListener=function(e,t){return u(this,e,t,!0)},i.prototype.once=function(e,t){return a(t),this.on(e,d(this,e,t)),this},i.prototype.prependOnceListener=function(e,t){return a(t),this.prependListener(e,d(this,e,t)),this},i.prototype.removeListener=function(e,t){let n,r,o,i,s;if(a(t),r=this._events,void 0===r)return this;if(n=r[e],void 0===n)return this;if(n===t||n.listener===t)0==--this._eventsCount?this._events=Object.create(null):(delete r[e],r.removeListener&&this.emit("removeListener",e,n.listener||t));else if("function"!=typeof n){for(o=-1,i=n.length-1;i>=0;i--)if(n[i]===t||n[i].listener===t){s=n[i].listener,o=i;break}if(o<0)return this;0===o?n.shift():function(e,t){for(;t+1<e.length;t++)e[t]=e[t+1];e.pop()}(n,o),1===n.length&&(r[e]=n[0]),void 0!==r.removeListener&&this.emit("removeListener",e,s||t)}return this},i.prototype.off=i.prototype.removeListener,i.prototype.removeAllListeners=function(e){let t,n,r;if(n=this._events,void 0===n)return this;if(void 0===n.removeListener)return 0===arguments.length?(this._events=Object.create(null),this._eventsCount=0):void 0!==n[e]&&(0==--this._eventsCount?this._events=Object.create(null):delete n[e]),this;if(0===arguments.length){const e=Object.keys(n);let t;for(r=0;r<e.length;++r)t=e[r],"removeListener"!==t&&this.removeAllListeners(t);return this.removeAllListeners("removeListener"),this._events=Object.create(null),this._eventsCount=0,this}if(t=n[e],"function"==typeof t)this.removeListener(e,t);else if(void 0!==t)for(r=t.length-1;r>=0;r--)this.removeListener(e,t[r]);return this},i.prototype.listeners=function(e){return f(this,e,!0)},i.prototype.rawListeners=function(e){return f(this,e,!1)},i.listenerCount=function(e,t){return"function"==typeof e.listenerCount?e.listenerCount(t):p.call(e,t)},i.prototype.listenerCount=p,i.prototype.eventNames=function(){return this._eventsCount>0?r(this._events):[]}}},t={};!function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}(67749)})();