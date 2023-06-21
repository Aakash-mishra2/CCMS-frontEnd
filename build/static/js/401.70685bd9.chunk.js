"use strict";(self.webpackChunkfrontend=self.webpackChunkfrontend||[]).push([[401],{401:function(e,t,n){n.r(t),n.d(t,{default:function(){return x}});var i=n(165),r=n(861),a=n(439),u=n(791),l=n(345),o=n(94),s=n(453),c=n(595),d=n(508),p=n(935),v=n(888),f=n(689),h=n(666),y=n(184);function x(){var e=(0,u.useContext)(p.V),t=(0,o.c)({court:{value:"",isValid:!1},description:{value:"",isValid:!1},location_city:{value:"",isValid:!1},location_pincode:{value:"",isValid:!1},judge:{value:"",isValid:!1}},!1),n=(0,a.Z)(t,2),x=n[0],T=n[1],m=(0,d.E)(),E=m.isLoading,V=m.sendRequest,C=m.error,Z=m.clearError,_=(0,f.s0)(),A=function(){var t=(0,r.Z)((0,i.Z)().mark((function t(n){return(0,i.Z)().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n.preventDefault(),t.prev=1,t.next=4,V({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0,FAST_REFRESH:!0}.REACT_APP_BACKEND_URL+"/admin/newcase","POST",JSON.stringify({court:x.inputs.court.value,description:x.inputs.description.value,location_city:x.inputs.location_city.value,location_pincode:x.inputs.location_pincode.value,judge:x.inputs.judge.value,plaintiff:e.loginID}),{"Content-Type":"application/json"});case 4:_("/"),t.next=9;break;case 7:t.prev=7,t.t0=t.catch(1);case 9:case"end":return t.stop()}}),t,null,[[1,7]])})));return function(e){return t.apply(this,arguments)}}();return(0,y.jsxs)(u.Fragment,{children:[(0,y.jsx)(v.Z,{error:C,onClear:Z}),E&&(0,y.jsx)(h.Z,{asOverlay:!0}),(0,y.jsxs)("form",{className:"case-form",onSubmit:A,children:[(0,y.jsx)(l.Z,{element:"input",type:"text",id:"court",label:"Court name:",errorText:"Please Enter a valid court name, required* ",validators:[(0,c.hg)()],onInput:T}),(0,y.jsx)(l.Z,{element:"textarea",type:"text",id:"description",label:"Case Description:",errorText:"Please Enter a short case description, atleast 10 words.",validators:[(0,c.CP)(9)],onInput:T}),(0,y.jsx)(l.Z,{element:"textarea",type:"text",id:"location_city",label:"Your Permanent Address:",placeHolder:"Enter Permanent Address Here.",errorText:"This is a required field.",validators:[(0,c.hg)()],onInput:T}),(0,y.jsx)(l.Z,{element:"input",type:"number",id:"location_pincode",placeHolder:"Enter Pincode here",errorText:"Required, Enter Atleast 6 numbers.",validators:[(0,c.hg)(),(0,c.CP)(6)],onInput:T}),(0,y.jsx)(l.Z,{element:"input",type:"text",id:"judge",label:"Name of the Judge:",errorText:"Please Enter Valid Name. ",validators:[(0,c.hg)()],onInput:T}),(0,y.jsx)(s.Z,{type:"submit",disabled:!x.isValid,children:"ADD CASE"})]})]})}},345:function(e,t,n){n.d(t,{Z:function(){return s}});var i=n(439),r=n(413),a=n(791),u=n(595),l=n(184);function o(e,t){switch(t.type){case"ALTER":return(0,r.Z)((0,r.Z)({},e),{},{value:t.val,isValid:(0,u.Gu)(t.val,t.validators)});case"TOUCH":return(0,r.Z)((0,r.Z)({},e),{},{isTouched:!0});default:return e}}function s(e){var t=(0,a.useReducer)(o,{isValid:e.initialValid||!1,value:e.initialValue||"",isTouched:!1}),n=(0,i.Z)(t,2),r=n[0],u=n[1];function s(t){u({type:"ALTER",val:t.target.value,validators:e.validators})}function c(e){u({type:"TOUCH"})}var d=e.id,p=e.onInput,v=r.isValid,f=r.value;(0,a.useEffect)((function(){p(d,f,v)}),[d,v,f,p]);var h="input"===e.element?(0,l.jsx)("input",{type:e.type,placeholder:e.placeHolder,id:e.id,onChange:s,onBlur:c,value:r.value}):(0,l.jsx)("textarea",{type:e.type,placeholder:e.placeHolder,id:e.id,rows:e.rows||3,onChange:s,onBlur:c,value:r.value});return(0,l.jsxs)("div",{className:"form-control ".concat(!r.isValid&&r.isTouched&&"form-control--invalid"),children:[(0,l.jsx)("label",{htmlFor:e.id,children:e.label}),h,!r.isValid&&r.isTouched&&(0,l.jsx)("p",{children:e.errorText})]})}},94:function(e,t,n){n.d(t,{c:function(){return o}});var i=n(439),r=n(942),a=n(413),u=n(791),l=function(e,t){switch(t.type){case"INPUT_CHANGE":var n=!0;for(var i in e.inputs)if(i===t.inputId){if(!e.inputs[i])continue;n=n&&t.isValid}else n=n&&e.inputs[i].isValid;return(0,a.Z)((0,a.Z)({},e),{},{inputs:(0,a.Z)((0,a.Z)({},e.inputs),{},(0,r.Z)({},t.inputId,{value:t.value,isValid:t.isValid})),isValid:n});case"SET_DATA":return{inputs:t.inputs,isValid:t.formIsValid};default:return e}},o=function(e,t){var n=(0,u.useReducer)(l,{inputs:e,isValid:t}),r=(0,i.Z)(n,2),a=r[0],o=r[1];return[a,(0,u.useCallback)((function(e,t,n){o({type:"INPUT_CHANGE",value:t,isValid:n,inputId:e})}),[]),(0,u.useCallback)((function(e,t){o({type:"SET_DATA",inputs:e,formIsValid:t})}),[])]}},595:function(e,t,n){n.d(t,{CP:function(){return s},Gu:function(){return d},Ox:function(){return c},hg:function(){return o}});var i=n(762),r="REQUIRE",a="MINLENGTH",u="MAXLENGTH",l="EMAIL",o=function(){return{type:r}},s=function(e){return{type:a,val:e}},c=function(){return{type:l}},d=function(e,t){var n,o=!0,s=(0,i.Z)(t);try{for(s.s();!(n=s.n()).done;){var c=n.value;c.type===r&&(o=o&&e.trim().length>0),c.type===a&&(o=o&&e.trim().length>=c.val),c.type===u&&(o=o&&e.trim().length<=c.val),"MIN"===c.type&&(o=o&&+e>=c.val),"MAX"===c.type&&(o=o&&+e<=c.val),c.type===l&&(o=o&&/^\S+@\S+\.\S+$/.test(e))}}catch(d){s.e(d)}finally{s.f()}return o}}}]);
//# sourceMappingURL=401.70685bd9.chunk.js.map