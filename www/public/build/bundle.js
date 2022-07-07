var app=function(t){"use strict";function e(){}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let a,c;function u(t,e){return a||(a=document.createElement("a")),a.href=e,t===a.href}function l(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function m(){return f(" ")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return""===t?null:+t}function _(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}function v(t){c=t}function $(t){(function(){if(!c)throw new Error("Function called outside component initialization");return c})().$$.on_mount.push(t)}const T=[],x=[],R=[],q=[],E=Promise.resolve();let k=!1;function C(t){R.push(t)}const D=new Set;let S=0;function L(){const t=c;do{for(;S<T.length;){const t=T[S];S++,v(t),A(t.$$)}for(v(null),T.length=0,S=0;x.length;)x.pop()();for(let t=0;t<R.length;t+=1){const e=R[t];D.has(e)||(D.add(e),e())}R.length=0}while(T.length);for(;q.length;)q.pop()();k=!1,D.clear(),v(t)}function A(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const j=new Set;function P(t,e){t&&t.i&&(j.delete(t),t.i(e))}function N(t,e,o,i){const{fragment:a,on_mount:c,on_destroy:u,after_update:l}=t.$$;a&&a.m(e,o),i||C((()=>{const e=c.map(n).filter(s);u?u.push(...e):r(e),t.$$.on_mount=[]})),l.forEach(C)}function H(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function M(t,e){-1===t.$$.dirty[0]&&(T.push(t),k||(k=!0,E.then(L)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function U(t,n,s,i,a,u,l,h=[-1]){const p=c;v(t);const f=t.$$={fragment:null,ctx:null,props:u,update:e,not_equal:a,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(p?p.$$.context:[])),callbacks:o(),dirty:h,skip_bound:!1,root:n.target||p.$$.root};l&&l(f.root);let m=!1;if(f.ctx=s?s(t,n.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&a(f.ctx[e],f.ctx[e]=r)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](r),m&&M(t,e)),n})):[],f.update(),m=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(d)}else f.fragment&&f.fragment.c();n.intro&&P(t.$$.fragment),N(t,n.target,n.anchor,n.customElement),L()}v(p)}class I{$destroy(){H(this,1),this.$destroy=e}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}class B extends Error{constructor(t,e,n){const o=`${t.status||0===t.status?t.status:""} ${t.statusText||""}`.trim();super(`Request failed with ${o?`status code ${o}`:"an unknown error"}`),this.name="HTTPError",this.response=t,this.request=e,this.options=n}}class O extends Error{constructor(t){super("Request timed out"),this.name="TimeoutError",this.request=t}}const z=t=>null!==t&&"object"==typeof t,G=(...t)=>{for(const e of t)if((!z(e)||Array.isArray(e))&&void 0!==e)throw new TypeError("The `options` argument must be an object");return F({},...t)},J=(t={},e={})=>{const n=new globalThis.Headers(t),o=e instanceof globalThis.Headers,r=new globalThis.Headers(e);for(const[t,e]of r.entries())o&&"undefined"===e||void 0===e?n.delete(t):n.set(t,e);return n},F=(...t)=>{let e={},n={};for(const o of t)if(Array.isArray(o))Array.isArray(e)||(e=[]),e=[...e,...o];else if(z(o)){for(let[t,n]of Object.entries(o))z(n)&&t in e&&(n=F(e[t],n)),e={...e,[t]:n};z(o.headers)&&(n=J(n,o.headers),e.headers=n)}return e},V="function"==typeof globalThis.AbortController,W="function"==typeof globalThis.ReadableStream,Q="function"==typeof globalThis.FormData,Y=["get","post","put","patch","head","delete"],K={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},X=2147483647,Z=Symbol("stop"),tt=t=>Y.includes(t)?t.toUpperCase():t,et=[413,429,503],nt={limit:2,methods:["get","put","head","delete","options","trace"],statusCodes:[408,413,429,500,502,503,504],afterStatusCodes:et,maxRetryAfter:Number.POSITIVE_INFINITY},ot=(t={})=>{if("number"==typeof t)return{...nt,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...nt,...t,afterStatusCodes:et}};class rt{constructor(t,e={}){var n,o,r;if(this._retryCount=0,this._input=t,this._options={credentials:this._input.credentials||"same-origin",...e,headers:J(this._input.headers,e.headers),hooks:F({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},e.hooks),method:tt(null!==(n=e.method)&&void 0!==n?n:this._input.method),prefixUrl:String(e.prefixUrl||""),retry:ot(e.retry),throwHttpErrors:!1!==e.throwHttpErrors,timeout:void 0===e.timeout?1e4:e.timeout,fetch:null!==(o=e.fetch)&&void 0!==o?o:globalThis.fetch.bind(globalThis)},"string"!=typeof this._input&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&"string"==typeof this._input){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(V&&(this.abortController=new globalThis.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",(()=>{this.abortController.abort()})),this._options.signal=this.abortController.signal),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const t="?"+("string"==typeof this._options.searchParams?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),e=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,t);!(Q&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)||this._options.headers&&this._options.headers["content-type"]||this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(e,this.request),this._options)}void 0!==this._options.json&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type",null!==(r=this._options.headers.get("content-type"))&&void 0!==r?r:"application/json"),this.request=new globalThis.Request(this.request,{body:this._options.body}))}static create(t,e){const n=new rt(t,e),o=async()=>{if(n._options.timeout>X)throw new RangeError("The `timeout` option cannot be greater than 2147483647");await Promise.resolve();let t=await n._fetch();for(const e of n._options.hooks.afterResponse){const o=await e(n.request,n._options,n._decorateResponse(t.clone()));o instanceof globalThis.Response&&(t=o)}if(n._decorateResponse(t),!t.ok&&n._options.throwHttpErrors){let e=new B(t,n.request,n._options);for(const t of n._options.hooks.beforeError)e=await t(e);throw e}if(n._options.onDownloadProgress){if("function"!=typeof n._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!W)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return n._stream(t.clone(),n._options.onDownloadProgress)}return t},r=n._options.retry.methods.includes(n.request.method.toLowerCase())?n._retry(o):o();for(const[t,o]of Object.entries(K))r[t]=async()=>{n.request.headers.set("accept",n.request.headers.get("accept")||o);const s=(await r).clone();if("json"===t){if(204===s.status)return"";if(e.parseJson)return e.parseJson(await s.text())}return s[t]()};return r}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof O)){if(t instanceof B){if(!this._options.retry.statusCodes.includes(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.includes(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,void 0!==this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}_decorateResponse(t){return this._options.parseJson&&(t.json=async()=>this._options.parseJson(await t.text())),t}async _retry(t){try{return await t()}catch(e){const n=Math.min(this._calculateRetryDelay(e),X);if(0!==n&&this._retryCount>0){await(async t=>new Promise((e=>{setTimeout(e,t)})))(n);for(const t of this._options.hooks.beforeRetry){if(await t({request:this.request,options:this._options,error:e,retryCount:this._retryCount})===Z)return}return this._retry(t)}throw e}}async _fetch(){for(const t of this._options.hooks.beforeRequest){const e=await t(this.request,this._options);if(e instanceof Request){this.request=e;break}if(e instanceof Response)return e}return!1===this._options.timeout?this._options.fetch(this.request.clone()):(async(t,e,n)=>new Promise(((o,r)=>{const s=setTimeout((()=>{e&&e.abort(),r(new O(t))}),n.timeout);n.fetch(t).then(o).catch(r).then((()=>{clearTimeout(s)}))})))(this.request.clone(),this.abortController,this._options)}_stream(t,e){const n=Number(t.headers.get("content-length"))||0;let o=0;return new globalThis.Response(new globalThis.ReadableStream({async start(r){const s=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:n},new Uint8Array),await async function t(){const{done:i,value:a}=await s.read();if(i)r.close();else{if(e){o+=a.byteLength;e({percent:0===n?0:o/n,transferredBytes:o,totalBytes:n},a)}r.enqueue(a),await t()}}()}}))}}
/*! MIT License © Sindre Sorhus */const st=t=>{const e=(e,n)=>rt.create(e,G(t,n));for(const n of Y)e[n]=(e,o)=>rt.create(e,G(t,o,{method:n}));return e.create=t=>st(G(t)),e.extend=e=>st(G(t,e)),e.stop=Z,e};var it=st();function at(t,e,n){const o=t.slice();return o[7]=e[n],o}function ct(t){let e,n,o,s,i,a,c,v,$,T,x,R,q,E,k,C,D,S,L,A,j,P,N,H,M,U,I,B,O,z=new Date(1e3*t[0][0].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"",G=t[3],J=[];for(let e=0;e<G.length;e+=1)J[e]=lt(at(t,G,e));return{c(){e=p("div"),n=p("div"),o=p("h2"),o.textContent="📸 Latest Image",s=m(),i=p("p"),a=f(z),c=m(),v=p("img"),T=m(),x=p("div"),R=p("table"),q=p("thead"),q.innerHTML='<tr><th scope="col">ID</th> \n                        <th scope="col">Timestamp</th> \n                        <th scope="col">Image</th></tr>',E=m(),k=p("tbody");for(let t=0;t<J.length;t+=1)J[t].c();C=m(),D=p("nav"),S=p("ul"),L=p("li"),A=p("button"),A.innerHTML='<span aria-hidden="true">«</span>',j=m(),P=p("li"),N=p("input"),M=m(),U=p("li"),I=p("button"),I.innerHTML='<span aria-hidden="true">»</span>',u(v.src,$=t[0][0].link)||y(v,"src",$),y(v,"alt","Latest"),y(v,"class","latest-image svelte-pafhem"),y(n,"class","col-lg-6 mb-5"),y(R,"class","table svelte-pafhem"),y(A,"class","page-link"),y(A,"href","#"),y(A,"aria-label","Previous"),y(L,"class","page-item"),y(N,"class","pagination-input svelte-pafhem"),y(N,"type","number"),y(N,"name","page"),y(N,"min",1),y(N,"max",H=Math.ceil(t[0].length/t[1])),y(P,"class","page-item"),y(I,"class","page-link"),y(I,"href","#"),y(I,"aria-label","Next"),y(U,"class","page-item"),y(S,"class","pagination"),y(x,"class","col-lg-6"),y(e,"class","row")},m(r,u){h(r,e,u),l(e,n),l(n,o),l(n,s),l(n,i),l(i,a),l(n,c),l(n,v),l(e,T),l(e,x),l(x,R),l(R,q),l(R,E),l(R,k);for(let t=0;t<J.length;t+=1)J[t].m(k,null);l(x,C),l(x,D),l(D,S),l(S,L),l(L,A),l(S,j),l(S,P),l(P,N),w(N,t[2]),l(S,M),l(S,U),l(U,I),B||(O=[g(A,"click",t[4]),g(N,"input",t[5]),g(I,"click",t[6])],B=!0)},p(t,e){if(1&e&&z!==(z=new Date(1e3*t[0][0].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"")&&_(a,z),1&e&&!u(v.src,$=t[0][0].link)&&y(v,"src",$),8&e){let n;for(G=t[3],n=0;n<G.length;n+=1){const o=at(t,G,n);J[n]?J[n].p(o,e):(J[n]=lt(o),J[n].c(),J[n].m(k,null))}for(;n<J.length;n+=1)J[n].d(1);J.length=G.length}3&e&&H!==(H=Math.ceil(t[0].length/t[1]))&&y(N,"max",H),4&e&&b(N.value)!==t[2]&&w(N,t[2])},d(t){t&&d(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(J,t),B=!1,r(O)}}}function ut(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="col"><h2>No image taken yet... 👀</h2></div>',y(n,"class","row")},m(t,e){h(t,n,e)},p:e,d(t){t&&d(n)}}}function lt(t){let e,n,o,r,s,i,a,c,u,g,b,w,v,$=t[7].id+"",T=new Date(1e3*t[7].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"";return{c(){e=p("tr"),n=p("th"),o=f($),r=m(),s=p("td"),i=f(T),a=m(),c=p("td"),u=p("a"),g=f("➡️"),v=m(),y(n,"scope","row"),y(u,"href",b=t[7].link),y(u,"alt",w=t[7].title),y(u,"target","_blank"),y(u,"class","svelte-pafhem")},m(t,d){h(t,e,d),l(e,n),l(n,o),l(e,r),l(e,s),l(s,i),l(e,a),l(e,c),l(c,u),l(u,g),l(e,v)},p(t,e){8&e&&$!==($=t[7].id+"")&&_(o,$),8&e&&T!==(T=new Date(1e3*t[7].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"")&&_(i,T),8&e&&b!==(b=t[7].link)&&y(u,"href",b),8&e&&w!==(w=t[7].title)&&y(u,"alt",w)},d(t){t&&d(e)}}}function ht(t){let n,o,r,s,i;function a(t,e){return t[0].length?ct:ut}let c=a(t),u=c(t);return{c(){n=p("div"),n.innerHTML='<div class="col-md-3 text-center"><img src="https://raw.githubusercontent.com/redii/garden/main/assets/logo.png" alt="My Garden Logo" class="garden-logo svelte-pafhem"/></div> \n    <div class="col-md-9"><h1>My Garden</h1> \n        <p>Saw <a href="https://redd.it/vkuhvk">this</a>\n            post on reddit and wanted to do it myself.</p> \n        <p>But since my garding skills and reliability when it comes to plants\n            are about <b>zero</b>, I wanted to automate that process.</p> \n        <p>Read more about my garden project on\n            <a href="https://github.com/redii/garden">Github</a>.</p></div>',o=m(),r=p("hr"),s=m(),u.c(),i=f(""),y(n,"class","row"),y(r,"class","mt-5 mb-5")},m(t,e){h(t,n,e),h(t,o,e),h(t,r,e),h(t,s,e),u.m(t,e),h(t,i,e)},p(t,[e]){c===(c=a(t))&&u?u.p(t,e):(u.d(1),u=c(t),u&&(u.c(),u.m(i.parentNode,i)))},i:e,o:e,d(t){t&&d(n),t&&d(o),t&&d(r),t&&d(s),u.d(t),t&&d(i)}}}function dt(t,e,n){let o,r,{images:s=[],pageSize:i=10}=e;$((async()=>{const t=await it.get("https://api.imgur.com/3/album/vkqhgQV",{headers:{Authorization:"Client-ID 5cd9c7ae889656c"}}).json();n(0,s=t.data.images)}));return t.$$set=t=>{"images"in t&&n(0,s=t.images),"pageSize"in t&&n(1,i=t.pageSize)},t.$$.update=()=>{7&t.$$.dirty&&n(3,r=s.slice((o-1)*i,o*i))},n(2,o=1),[s,i,o,r,()=>n(2,o-=1),function(){o=b(this.value),n(2,o)},()=>n(2,o+=1)]}class pt extends I{constructor(t){super(),U(this,t,dt,ht,i,{images:0,pageSize:1})}}function ft(t){let n,o,r,s,i,a,c,u;return i=new pt({}),{c(){var t;n=p("main"),o=p("a"),o.innerHTML='<div class="github-badge svelte-1mutf4c"><img src="https://raw.githubusercontent.com/redii/garden/main/assets/github.jpeg" alt="Github Logo" class="svelte-1mutf4c"/></div>',r=m(),s=p("div"),(t=i.$$.fragment)&&t.c(),a=m(),c=p("footer"),c.innerHTML='made with <span class="emoji svelte-1mutf4c">❤️</span>',y(o,"href","https://github.com/redii/garden"),y(o,"alt","Github Project"),y(s,"class","container"),y(n,"class","svelte-1mutf4c"),y(c,"class","text-center svelte-1mutf4c")},m(t,e){h(t,n,e),l(n,o),l(n,r),l(n,s),N(i,s,null),h(t,a,e),h(t,c,e),u=!0},p:e,i(t){u||(P(i.$$.fragment,t),u=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(j.has(t))return;j.add(t),(void 0).c.push((()=>{j.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}(i.$$.fragment,t),u=!1},d(t){t&&d(n),H(i),t&&d(a),t&&d(c)}}}const mt=new class extends I{constructor(t){super(),U(this,t,null,ft,i,{})}}({target:document.getElementById("content")});return t.app=mt,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
//# sourceMappingURL=bundle.js.map
