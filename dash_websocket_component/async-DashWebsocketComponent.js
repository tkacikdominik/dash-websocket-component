"use strict";(self.webpackChunkdash_websocket_component=self.webpackChunkdash_websocket_component||[]).push([[12],{368:(t,e,n)=>{n.r(e),n.d(e,{default:()=>y});var o=n(609),r=n(120),i=n.n(r);function s(t){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},s(t)}function c(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,a(o.key),o)}}function a(t){var e=function(t,e){if("object"!=s(t)||!t)return t;var n=t[Symbol.toPrimitive];if(void 0!==n){var o=n.call(t,"string");if("object"!=s(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"==s(e)?e:String(e)}function u(t,e,n){return e=l(e),function(t,e){if(e&&("object"===s(e)||"function"==typeof e))return e;if(void 0!==e)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t)}(t,p()?Reflect.construct(e,n||[],l(t).constructor):e.apply(t,n))}function p(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){})))}catch(t){}return(p=function(){return!!t})()}function l(t){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},l(t)}function f(t,e){return f=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},f(t,e)}var y=function(t){function e(){return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),u(this,e,arguments)}var n,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&f(t,e)}(e,t),n=e,(o=[{key:"_init_client",value:function(){var t=this,e=this.props.url,n=this.props.protocols;e=e||"ws://"+location.host+location.pathname+"ws",this.client=new WebSocket(e,n),this.client.onopen=function(e){t.props.setProps({state:{readyState:WebSocket.OPEN,isTrusted:e.isTrusted,timeStamp:e.timeStamp,origin:e.origin}})},this.client.onmessage=function(e){t.props.setProps({message:{data:e.data,isTrusted:e.isTrusted,origin:e.origin,timeStamp:e.timeStamp}})},this.client.onerror=function(e){t.props.setProps({error:JSON.stringify(e)})},this.client.onclose=function(e){t.props.setProps({error:JSON.stringify(e)}),t.props.setProps({state:{readyState:WebSocket.CLOSED,isTrusted:e.isTrusted,timeStamp:e.timeStamp,code:e.code,reason:e.reason,wasClean:e.wasClean}})}}},{key:"_watchdog",value:function(){var t=this;this.props.setProps({state:{lastConnected:0,readyState:WebSocket.CLOSED}}),setInterval((function(){t.props.state.readyState===WebSocket.CLOSED&&t._init_client()}),1e3)}},{key:"componentDidMount",value:function(){this._watchdog()}},{key:"componentDidUpdate",value:function(t){var e=this.props.send;e&&e!==t.send&&this.props.state.readyState===WebSocket.OPEN&&this.client.send(e)}},{key:"componentWillUnmount",value:function(){this.client.onopen=null,this.client.onclose=null,this.client.onerror=null,this.client.onmessage=null,this.client.close()}},{key:"render",value:function(){return null}}])&&c(n.prototype,o),Object.defineProperty(n,"prototype",{writable:!1}),e}(o.Component);y.defaultProps={state:{readyState:WebSocket.CONNECTING}},y.propTypes={state:i().oneOfType([i().object,i().string]),message:i().oneOfType([i().object,i().string]),error:i().oneOfType([i().object,i().string]),send:i().oneOfType([i().object,i().string]),url:i().string,protocols:i().arrayOf(i().string),id:i().string,setProps:i().func}}}]);
//# sourceMappingURL=async-DashWebsocketComponent.js.map