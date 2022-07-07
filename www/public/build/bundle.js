var app=function(t){"use strict";function e(){}function n(t){return t()}function o(){return Object.create(null)}function r(t){t.forEach(n)}function s(t){return"function"==typeof t}function i(t,e){return t!=t?e==e:t!==e||t&&"object"==typeof t||"function"==typeof t}let a,c;function l(t,e){return a||(a=document.createElement("a")),a.href=e,t===a.href}function u(t,e){t.appendChild(e)}function h(t,e,n){t.insertBefore(e,n||null)}function d(t){t.parentNode.removeChild(t)}function p(t){return document.createElement(t)}function f(t){return document.createTextNode(t)}function m(){return f(" ")}function g(t,e,n,o){return t.addEventListener(e,n,o),()=>t.removeEventListener(e,n,o)}function y(t,e,n){null==n?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function b(t){return""===t?null:+t}function _(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function w(t,e){t.value=null==e?"":e}function v(t,e,n,o){null===n?t.style.removeProperty(e):t.style.setProperty(e,n,o?"important":"")}function $(t){c=t}function T(t){(function(){if(!c)throw new Error("Function called outside component initialization");return c})().$$.on_mount.push(t)}const x=[],R=[],E=[],q=[],k=Promise.resolve();let D=!1;function C(t){E.push(t)}const L=new Set;let S=0;function A(){const t=c;do{for(;S<x.length;){const t=x[S];S++,$(t),j(t.$$)}for($(null),x.length=0,S=0;R.length;)R.pop()();for(let t=0;t<E.length;t+=1){const e=E[t];L.has(e)||(L.add(e),e())}E.length=0}while(x.length);for(;q.length;)q.pop()();D=!1,L.clear(),$(t)}function j(t){if(null!==t.fragment){t.update(),r(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(C)}}const P=new Set;function M(t,e){t&&t.i&&(P.delete(t),t.i(e))}function H(t,e,o,i){const{fragment:a,on_mount:c,on_destroy:l,after_update:u}=t.$$;a&&a.m(e,o),i||C((()=>{const e=c.map(n).filter(s);l?l.push(...e):r(e),t.$$.on_mount=[]})),u.forEach(C)}function N(t,e){const n=t.$$;null!==n.fragment&&(r(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function U(t,e){-1===t.$$.dirty[0]&&(x.push(t),D||(D=!0,k.then(A)),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function z(t,n,s,i,a,l,u,h=[-1]){const p=c;$(t);const f=t.$$={fragment:null,ctx:null,props:l,update:e,not_equal:a,bound:o(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(p?p.$$.context:[])),callbacks:o(),dirty:h,skip_bound:!1,root:n.target||p.$$.root};u&&u(f.root);let m=!1;if(f.ctx=s?s(t,n.props||{},((e,n,...o)=>{const r=o.length?o[0]:n;return f.ctx&&a(f.ctx[e],f.ctx[e]=r)&&(!f.skip_bound&&f.bound[e]&&f.bound[e](r),m&&U(t,e)),n})):[],f.update(),m=!0,r(f.before_update),f.fragment=!!i&&i(f.ctx),n.target){if(n.hydrate){const t=function(t){return Array.from(t.childNodes)}(n.target);f.fragment&&f.fragment.l(t),t.forEach(d)}else f.fragment&&f.fragment.c();n.intro&&M(t.$$.fragment),H(t,n.target,n.anchor,n.customElement),A()}$(p)}class I{$destroy(){N(this,1),this.$destroy=e}$on(t,e){const n=this.$$.callbacks[t]||(this.$$.callbacks[t]=[]);return n.push(e),()=>{const t=n.indexOf(e);-1!==t&&n.splice(t,1)}}$set(t){var e;this.$$set&&(e=t,0!==Object.keys(e).length)&&(this.$$.skip_bound=!0,this.$$set(t),this.$$.skip_bound=!1)}}class B extends Error{constructor(t,e,n){const o=`${t.status||0===t.status?t.status:""} ${t.statusText||""}`.trim();super(`Request failed with ${o?`status code ${o}`:"an unknown error"}`),this.name="HTTPError",this.response=t,this.request=e,this.options=n}}class O extends Error{constructor(t){super("Request timed out"),this.name="TimeoutError",this.request=t}}const G=t=>null!==t&&"object"==typeof t,J=(...t)=>{for(const e of t)if((!G(e)||Array.isArray(e))&&void 0!==e)throw new TypeError("The `options` argument must be an object");return V({},...t)},F=(t={},e={})=>{const n=new globalThis.Headers(t),o=e instanceof globalThis.Headers,r=new globalThis.Headers(e);for(const[t,e]of r.entries())o&&"undefined"===e||void 0===e?n.delete(t):n.set(t,e);return n},V=(...t)=>{let e={},n={};for(const o of t)if(Array.isArray(o))Array.isArray(e)||(e=[]),e=[...e,...o];else if(G(o)){for(let[t,n]of Object.entries(o))G(n)&&t in e&&(n=V(e[t],n)),e={...e,[t]:n};G(o.headers)&&(n=F(n,o.headers),e.headers=n)}return e},W="function"==typeof globalThis.AbortController,Q="function"==typeof globalThis.ReadableStream,Y="function"==typeof globalThis.FormData,K=["get","post","put","patch","head","delete"],X={json:"application/json",text:"text/*",formData:"multipart/form-data",arrayBuffer:"*/*",blob:"*/*"},Z=2147483647,tt=Symbol("stop"),et=t=>K.includes(t)?t.toUpperCase():t,nt=[413,429,503],ot={limit:2,methods:["get","put","head","delete","options","trace"],statusCodes:[408,413,429,500,502,503,504],afterStatusCodes:nt,maxRetryAfter:Number.POSITIVE_INFINITY},rt=(t={})=>{if("number"==typeof t)return{...ot,limit:t};if(t.methods&&!Array.isArray(t.methods))throw new Error("retry.methods must be an array");if(t.statusCodes&&!Array.isArray(t.statusCodes))throw new Error("retry.statusCodes must be an array");return{...ot,...t,afterStatusCodes:nt}};class st{constructor(t,e={}){var n,o,r;if(this._retryCount=0,this._input=t,this._options={credentials:this._input.credentials||"same-origin",...e,headers:F(this._input.headers,e.headers),hooks:V({beforeRequest:[],beforeRetry:[],beforeError:[],afterResponse:[]},e.hooks),method:et(null!==(n=e.method)&&void 0!==n?n:this._input.method),prefixUrl:String(e.prefixUrl||""),retry:rt(e.retry),throwHttpErrors:!1!==e.throwHttpErrors,timeout:void 0===e.timeout?1e4:e.timeout,fetch:null!==(o=e.fetch)&&void 0!==o?o:globalThis.fetch.bind(globalThis)},"string"!=typeof this._input&&!(this._input instanceof URL||this._input instanceof globalThis.Request))throw new TypeError("`input` must be a string, URL, or Request");if(this._options.prefixUrl&&"string"==typeof this._input){if(this._input.startsWith("/"))throw new Error("`input` must not begin with a slash when using `prefixUrl`");this._options.prefixUrl.endsWith("/")||(this._options.prefixUrl+="/"),this._input=this._options.prefixUrl+this._input}if(W&&(this.abortController=new globalThis.AbortController,this._options.signal&&this._options.signal.addEventListener("abort",(()=>{this.abortController.abort()})),this._options.signal=this.abortController.signal),this.request=new globalThis.Request(this._input,this._options),this._options.searchParams){const t="?"+("string"==typeof this._options.searchParams?this._options.searchParams.replace(/^\?/,""):new URLSearchParams(this._options.searchParams).toString()),e=this.request.url.replace(/(?:\?.*?)?(?=#|$)/,t);!(Y&&this._options.body instanceof globalThis.FormData||this._options.body instanceof URLSearchParams)||this._options.headers&&this._options.headers["content-type"]||this.request.headers.delete("content-type"),this.request=new globalThis.Request(new globalThis.Request(e,this.request),this._options)}void 0!==this._options.json&&(this._options.body=JSON.stringify(this._options.json),this.request.headers.set("content-type",null!==(r=this._options.headers.get("content-type"))&&void 0!==r?r:"application/json"),this.request=new globalThis.Request(this.request,{body:this._options.body}))}static create(t,e){const n=new st(t,e),o=async()=>{if(n._options.timeout>Z)throw new RangeError("The `timeout` option cannot be greater than 2147483647");await Promise.resolve();let t=await n._fetch();for(const e of n._options.hooks.afterResponse){const o=await e(n.request,n._options,n._decorateResponse(t.clone()));o instanceof globalThis.Response&&(t=o)}if(n._decorateResponse(t),!t.ok&&n._options.throwHttpErrors){let e=new B(t,n.request,n._options);for(const t of n._options.hooks.beforeError)e=await t(e);throw e}if(n._options.onDownloadProgress){if("function"!=typeof n._options.onDownloadProgress)throw new TypeError("The `onDownloadProgress` option must be a function");if(!Q)throw new Error("Streams are not supported in your environment. `ReadableStream` is missing.");return n._stream(t.clone(),n._options.onDownloadProgress)}return t},r=n._options.retry.methods.includes(n.request.method.toLowerCase())?n._retry(o):o();for(const[t,o]of Object.entries(X))r[t]=async()=>{n.request.headers.set("accept",n.request.headers.get("accept")||o);const s=(await r).clone();if("json"===t){if(204===s.status)return"";if(e.parseJson)return e.parseJson(await s.text())}return s[t]()};return r}_calculateRetryDelay(t){if(this._retryCount++,this._retryCount<this._options.retry.limit&&!(t instanceof O)){if(t instanceof B){if(!this._options.retry.statusCodes.includes(t.response.status))return 0;const e=t.response.headers.get("Retry-After");if(e&&this._options.retry.afterStatusCodes.includes(t.response.status)){let t=Number(e);return Number.isNaN(t)?t=Date.parse(e)-Date.now():t*=1e3,void 0!==this._options.retry.maxRetryAfter&&t>this._options.retry.maxRetryAfter?0:t}if(413===t.response.status)return 0}return.3*2**(this._retryCount-1)*1e3}return 0}_decorateResponse(t){return this._options.parseJson&&(t.json=async()=>this._options.parseJson(await t.text())),t}async _retry(t){try{return await t()}catch(e){const n=Math.min(this._calculateRetryDelay(e),Z);if(0!==n&&this._retryCount>0){await(async t=>new Promise((e=>{setTimeout(e,t)})))(n);for(const t of this._options.hooks.beforeRetry){if(await t({request:this.request,options:this._options,error:e,retryCount:this._retryCount})===tt)return}return this._retry(t)}throw e}}async _fetch(){for(const t of this._options.hooks.beforeRequest){const e=await t(this.request,this._options);if(e instanceof Request){this.request=e;break}if(e instanceof Response)return e}return!1===this._options.timeout?this._options.fetch(this.request.clone()):(async(t,e,n)=>new Promise(((o,r)=>{const s=setTimeout((()=>{e&&e.abort(),r(new O(t))}),n.timeout);n.fetch(t).then(o).catch(r).then((()=>{clearTimeout(s)}))})))(this.request.clone(),this.abortController,this._options)}_stream(t,e){const n=Number(t.headers.get("content-length"))||0;let o=0;return new globalThis.Response(new globalThis.ReadableStream({async start(r){const s=t.body.getReader();e&&e({percent:0,transferredBytes:0,totalBytes:n},new Uint8Array),await async function t(){const{done:i,value:a}=await s.read();if(i)r.close();else{if(e){o+=a.byteLength;e({percent:0===n?0:o/n,transferredBytes:o,totalBytes:n},a)}r.enqueue(a),await t()}}()}}))}}
/*! MIT License © Sindre Sorhus */const it=t=>{const e=(e,n)=>st.create(e,J(t,n));for(const n of K)e[n]=(e,o)=>st.create(e,J(t,o,{method:n}));return e.create=t=>it(J(t)),e.extend=e=>it(J(t,e)),e.stop=tt,e};var at=it();function ct(t,e,n){const o=t.slice();return o[8]=e[n],o}function lt(t){let e,n,o,s,i,a,c,$,T,x,R,E,q,k,D,C,L,S,A,j,P,M,H,N,U,z,I,B,O,G,J,F,V,W,Q,Y,K,X,Z,tt=new Date(1e3*t[0][0].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"",et=t[0].length+"",nt=new Date(1e3*t[0][t[0].length-1].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit"})+"",ot=Math.ceil(t[0].length/t[1])+"",rt=t[3],st=[];for(let e=0;e<rt.length;e+=1)st[e]=dt(ct(t,rt,e));return{c(){e=p("div"),n=p("div"),o=p("h2"),o.textContent="📸 Latest Image",s=m(),i=p("p"),a=f(tt),c=m(),$=p("img"),x=m(),R=p("div"),E=p("p"),q=p("b"),k=f(et),D=f(" images taken since "),C=f(nt),L=m(),S=p("table"),A=p("thead"),A.innerHTML='<tr><th scope="col">ID</th> \n                        <th scope="col">Timestamp</th> \n                        <th scope="col">Image</th></tr>',j=m(),P=p("tbody");for(let t=0;t<st.length;t+=1)st[t].c();M=m(),H=p("nav"),N=p("ul"),U=p("li"),z=p("button"),z.innerHTML='<span aria-hidden="true">«</span>',I=m(),B=p("li"),O=p("input"),J=m(),F=p("li"),V=p("button"),V.innerHTML='<span aria-hidden="true">»</span>',W=m(),Q=p("div"),Y=f(ot),K=f(" pages"),l($.src,T=t[0][0].link)||y($,"src",T),y($,"alt","Latest"),y($,"class","latest-image svelte-19sz75c"),y(n,"class","col-md-12 col-lg-8 mb-5"),y(E,"class","text-center"),y(S,"class","table svelte-19sz75c"),y(z,"class","page-link"),y(z,"href","#"),y(z,"aria-label","Previous"),y(U,"class","page-item"),y(O,"class","pagination-input svelte-19sz75c"),y(O,"type","number"),y(O,"name","page"),y(O,"min",1),y(O,"max",G=Math.ceil(t[0].length/t[1])),y(B,"class","page-item"),y(V,"class","page-link"),y(V,"href","#"),y(V,"aria-label","Next"),y(F,"class","page-item"),y(N,"class","pagination"),v(H,"float","left"),v(Q,"float","right"),v(Q,"line-height","38px"),y(R,"class","col-md-12 col-lg-4"),y(e,"class","row")},m(r,l){h(r,e,l),u(e,n),u(n,o),u(n,s),u(n,i),u(i,a),u(n,c),u(n,$),u(e,x),u(e,R),u(R,E),u(E,q),u(q,k),u(E,D),u(E,C),u(R,L),u(R,S),u(S,A),u(S,j),u(S,P);for(let t=0;t<st.length;t+=1)st[t].m(P,null);u(R,M),u(R,H),u(H,N),u(N,U),u(U,z),u(N,I),u(N,B),u(B,O),w(O,t[2]),u(N,J),u(N,F),u(F,V),u(R,W),u(R,Q),u(Q,Y),u(Q,K),X||(Z=[g(z,"click",t[5]),g(O,"input",t[6]),g(V,"click",t[7])],X=!0)},p(t,e){if(1&e&&tt!==(tt=new Date(1e3*t[0][0].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"")&&_(a,tt),1&e&&!l($.src,T=t[0][0].link)&&y($,"src",T),1&e&&et!==(et=t[0].length+"")&&_(k,et),1&e&&nt!==(nt=new Date(1e3*t[0][t[0].length-1].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit"})+"")&&_(C,nt),8&e){let n;for(rt=t[3],n=0;n<rt.length;n+=1){const o=ct(t,rt,n);st[n]?st[n].p(o,e):(st[n]=dt(o),st[n].c(),st[n].m(P,null))}for(;n<st.length;n+=1)st[n].d(1);st.length=rt.length}3&e&&G!==(G=Math.ceil(t[0].length/t[1]))&&y(O,"max",G),4&e&&b(O.value)!==t[2]&&w(O,t[2]),3&e&&ot!==(ot=Math.ceil(t[0].length/t[1])+"")&&_(Y,ot)},d(t){t&&d(e),function(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}(st,t),X=!1,r(Z)}}}function ut(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="col"><h2>No image taken yet... 👀</h2></div>',y(n,"class","row")},m(t,e){h(t,n,e)},p:e,d(t){t&&d(n)}}}function ht(t){let n;return{c(){n=p("div"),n.innerHTML='<div class="spinner-border mt-5" role="status"></div>',y(n,"class","d-flex justify-content-center")},m(t,e){h(t,n,e)},p:e,d(t){t&&d(n)}}}function dt(t){let e,n,o,r,s,i,a,c,l,g,b,w,v,$=t[8].id+"",T=new Date(1e3*t[8].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"";return{c(){e=p("tr"),n=p("th"),o=f($),r=m(),s=p("td"),i=f(T),a=m(),c=p("td"),l=p("a"),g=f("➡️"),v=m(),y(n,"scope","row"),y(l,"href",b=t[8].link),y(l,"alt",w=t[8].title),y(l,"target","_blank"),y(l,"class","svelte-19sz75c")},m(t,d){h(t,e,d),u(e,n),u(n,o),u(e,r),u(e,s),u(s,i),u(e,a),u(e,c),u(c,l),u(l,g),u(e,v)},p(t,e){8&e&&$!==($=t[8].id+"")&&_(o,$),8&e&&T!==(T=new Date(1e3*t[8].datetime).toLocaleDateString("de-DE",{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})+"")&&_(i,T),8&e&&b!==(b=t[8].link)&&y(l,"href",b),8&e&&w!==(w=t[8].title)&&y(l,"alt",w)},d(t){t&&d(e)}}}function pt(t){let n,o,r,s,i;function a(t,e){return t[4]?ht:t[0].length?lt:ut}let c=a(t),l=c(t);return{c(){n=p("div"),n.innerHTML='<div class="col-md-3 text-center"><img src="https://raw.githubusercontent.com/redii/garden/main/assets/logo.png" alt="My Garden Logo" class="garden-logo svelte-19sz75c"/></div> \n    <div class="col-md-9"><h1>My Garden</h1> \n        <p>Saw <a href="https://redd.it/vkuhvk">this</a>\n            post on reddit and wanted to do it myself.</p> \n        <p>But since my garding skills and reliability when it comes to plants\n            are about <b>zero</b>, I wanted to automate that process.</p> \n        <p>Read more about my garden project on\n            <a href="https://github.com/redii/garden">Github</a>.</p></div>',o=m(),r=p("hr"),s=m(),l.c(),i=f(""),y(n,"class","row"),y(r,"class","mt-5 mb-5")},m(t,e){h(t,n,e),h(t,o,e),h(t,r,e),h(t,s,e),l.m(t,e),h(t,i,e)},p(t,[e]){c===(c=a(t))&&l?l.p(t,e):(l.d(1),l=c(t),l&&(l.c(),l.m(i.parentNode,i)))},i:e,o:e,d(t){t&&d(n),t&&d(o),t&&d(r),t&&d(s),l.d(t),t&&d(i)}}}function ft(t,e,n){let o,r,s,{images:i=[],pageSize:a=10}=e;T((async()=>{const t=await at.get("https://api.imgur.com/3/album/vkqhgQV",{headers:{Authorization:"Client-ID 5cd9c7ae889656c"}}).json();n(0,i=t.data.images.reverse())}));return t.$$set=t=>{"images"in t&&n(0,i=t.images),"pageSize"in t&&n(1,a=t.pageSize)},t.$$.update=()=>{7&t.$$.dirty&&n(3,s=i.slice((r-1)*a,r*a))},n(4,o=!0),n(2,r=1),[i,a,r,s,true,()=>n(2,r-=1),function(){r=b(this.value),n(2,r)},()=>n(2,r+=1)]}class mt extends I{constructor(t){super(),z(this,t,ft,pt,i,{images:0,pageSize:1})}}function gt(t){let n,o,r,s,i,a,c,l;return i=new mt({}),{c(){var t;n=p("main"),o=p("a"),o.innerHTML='<div class="github-badge svelte-1mutf4c"><img src="https://raw.githubusercontent.com/redii/garden/main/assets/github.jpeg" alt="Github Logo" class="svelte-1mutf4c"/></div>',r=m(),s=p("div"),(t=i.$$.fragment)&&t.c(),a=m(),c=p("footer"),c.innerHTML='made with <span class="emoji svelte-1mutf4c">❤️</span>',y(o,"href","https://github.com/redii/garden"),y(o,"alt","Github Project"),y(s,"class","container"),y(n,"class","svelte-1mutf4c"),y(c,"class","text-center svelte-1mutf4c")},m(t,e){h(t,n,e),u(n,o),u(n,r),u(n,s),H(i,s,null),h(t,a,e),h(t,c,e),l=!0},p:e,i(t){l||(M(i.$$.fragment,t),l=!0)},o(t){!function(t,e,n,o){if(t&&t.o){if(P.has(t))return;P.add(t),(void 0).c.push((()=>{P.delete(t),o&&(n&&t.d(1),o())})),t.o(e)}}(i.$$.fragment,t),l=!1},d(t){t&&d(n),N(i),t&&d(a),t&&d(c)}}}const yt=new class extends I{constructor(t){super(),z(this,t,null,gt,i,{})}}({target:document.getElementById("content")});return t.app=yt,Object.defineProperty(t,"__esModule",{value:!0}),t}({});
//# sourceMappingURL=bundle.js.map
