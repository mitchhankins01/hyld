(this.webpackJsonphyld=this.webpackJsonphyld||[]).push([[1],{245:function(e,t){},321:function(e,t,n){"use strict";n.r(t);var a=n(17),l=n(0),o=n(9),i=n(141),r=n(142),s=n(177),c=n(175),d=n(181),u=n.n(d),m=n(184),b=n.n(m),p=n(110),f=n.n(p),j=[{locale:"en",messages:n.e(17).then(n.bind(null,576))},{locale:"ru",messages:n.e(18).then(n.bind(null,577))},{locale:"de",messages:n.e(16).then(n.bind(null,578))}],y=(n(318),n(319),n(21)),h=Object(l.lazy)((function(){return Promise.all([n.e(4),n.e(19)]).then(n.bind(null,582))})),x=Object(l.lazy)((function(){return Promise.all([n.e(0),n.e(6),n.e(13)]).then(n.bind(null,583))})),g=Object(l.lazy)((function(){return Promise.all([n.e(0),n.e(5),n.e(14)]).then(n.bind(null,584))})),O=[Object(a.jsx)(y.d,{path:"/hyld",exact:!0,redirect:"/hyld/home"}),Object(a.jsx)(y.d,{path:"/hyld/about",exact:!0,component:h}),Object(a.jsx)(y.d,{path:"/hyld/home",exact:!0,component:x}),Object(a.jsx)(y.d,{path:"/hyld/hometable",exact:!0,component:g})],v=n(188),I=n.n(v),T=n(114),M=n.n(T),C=n(185),k=n.n(C),L=n(192),z=n.n(L),D=n(189),P=n.n(D),A=n(121),N=n.n(A),_=(n(186),n(191)),w=n.n(_),E=n(190),J=n.n(E),S=n(122),B=n.n(S),F=n(187),H=n.n(F),X=n(123),q=n.n(X),G=n(69),K=n.n(G),Q=n(119),R=n.n(Q),U=n(115),V=n.n(U),W=n(118),Y=n.n(W),Z=n(120),$=n.n(Z),ee=[{id:"default",color:V.a[500],source:{palette:{primary:V.a,secondary:K.a,error:K.a},typography:{fontColor:K.a}}},{id:"amber",color:Y.a[500],source:{palette:{primary:Y.a,secondary:R.a,error:K.a}}},{id:"orange",color:$.a[500],source:{palette:{primary:$.a,secondary:R.a,error:K.a}}}],te=function(e){var t=e.intl,n=e.updateLocale,l=e.locale,o=e.menuContext,i=e.themeContext,r=e.a2HSContext,s=e.auth,c=o.isDesktop,d=o.isAuthMenuOpen,u=o.useMiniMode,m=o.setMiniMode,b=i.themeID,p=i.setThemeID,f=(s.auth,s.setAuth),y=r.isAppInstallable,h=r.isAppInstalled,x=r.deferredPrompt,g=j.map((function(e){return{value:void 0,visible:!0,primaryText:t.formatMessage({id:e.locale}),onClick:function(){n(e.locale)},leftIcon:Object(a.jsx)(N.a,{})}})),O=!0,v=ee.map((function(e){return{value:void 0,visible:!0,primaryText:t.formatMessage({id:e.id}),onClick:function(){p(e.id)},leftIcon:Object(a.jsx)(B.a,{style:{color:e.color}})}}));return d?[{value:"/hyld/signin",onClick:function(){f({isAuthenticated:!1})},visible:!0,primaryText:t.formatMessage({id:"sign_out"}),leftIcon:Object(a.jsx)(k.a,{})}]:[{value:"/hyld/hometable",visible:O,primaryText:"Dividend Table",leftIcon:Object(a.jsx)(q.a,{})},{value:"/hyld/home",visible:O,primaryText:"Dividend Calendar",leftIcon:Object(a.jsx)(q.a,{})},{primaryText:"Xyz",primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(H.a,{}),nestedItems:[{value:"/hyld/about",visible:O,primaryText:"Support",leftIcon:Object(a.jsx)(I.a,{})}]},{value:"/hyld/about",visible:!0,primaryText:t.formatMessage({id:"about"}),leftIcon:Object(a.jsx)(P.a,{})},{divider:!0},{primaryText:t.formatMessage({id:"settings"}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(J.a,{}),nestedItems:[{primaryText:t.formatMessage({id:"theme"}),secondaryText:t.formatMessage({id:b}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(B.a,{}),nestedItems:v},{primaryText:t.formatMessage({id:"language"}),secondaryText:t.formatMessage({id:l}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(N.a,{}),nestedItems:g},{visible:!!c,onClick:function(){m(!u)},primaryText:t.formatMessage({id:"menu_mini_mode"}),leftIcon:u?Object(a.jsx)(w.a,{}):Object(a.jsx)(M.a,{})}]},{value:null,visible:y&&!h,onClick:function(){x.prompt()},primaryText:t.formatMessage({id:"install",defaultMessage:"Install"}),leftIcon:Object(a.jsx)(z.a,{})}]},ne=n(109),ae={routes:O,locale:{locales:j,defaultLocale:n.n(ne)()(["en","de","ru"],"en"),onError:function(e){}},menu:{getMenuItems:te},theme:{themes:ee,defaultThemeID:"default",defaultType:"light"},pages:{LandingPage:Object(l.lazy)((function(){return n.e(20).then(n.bind(null,574))})),PageNotFound:Object(l.lazy)((function(){return n.e(21).then(n.bind(null,575))}))}},le=f()(b.a,ae),oe=function(e){Object(s.a)(n,e);var t=Object(c.a)(n);function n(){return Object(i.a)(this,n),t.apply(this,arguments)}return Object(r.a)(n,[{key:"render",value:function(){return Object(a.jsx)(u.a,{config:le})}}]),n}(l.Component);Object(o.render)(Object(a.jsx)(oe,{}),document.getElementById("root"))}},[[321,2,3]]]);
//# sourceMappingURL=main.f97a43b5.chunk.js.map