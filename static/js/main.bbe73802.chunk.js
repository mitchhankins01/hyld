(this.webpackJsonphyld=this.webpackJsonphyld||[]).push([[0],{242:function(e,t){},318:function(e,t,n){"use strict";n.r(t);var a=n(18),o=n(0),s=n(9),r=n(174),i=n(175),l=n(190),c=n(189),u=n(176),d=n.n(u),m=n(179),p=n.n(m),b=n(110),f=n.n(b),y=[{locale:"en",messages:n.e(14).then(n.bind(null,556))},{locale:"ru",messages:n.e(15).then(n.bind(null,557))},{locale:"de",messages:n.e(13).then(n.bind(null,558))}],j=(n(315),n(316),n(21)),h=Object(o.lazy)((function(){return Promise.all([n.e(3),n.e(16)]).then(n.bind(null,562))})),g=Object(o.lazy)((function(){return Promise.all([n.e(4),n.e(11)]).then(n.bind(null,563))})),x=[Object(a.jsx)(j.d,{path:"/hyld",exact:!0,redirect:"/hyld/home"}),Object(a.jsx)(j.d,{path:"/hyld/about",exact:!0,component:h}),Object(a.jsx)(j.d,{path:"/hyld/home",exact:!0,component:g})],O=n(184),I=n.n(O),v=n(112),T=n.n(v),M=n(180),C=n.n(M),k=n(188),L=n.n(k),z=n(185),A=n.n(z),D=n(119),N=n.n(D),P=(n(181),n(187)),_=n.n(P),w=n(186),E=n.n(w),J=n(120),S=n.n(J),B=n(183),F=n.n(B),H=n(182),X=n.n(H),q=n(69),G=n.n(q),K=n(117),Q=n.n(K),R=n(113),U=n.n(R),V=n(116),W=n.n(V),Y=n(118),Z=n.n(Y),$=[{id:"default",color:U.a[500],source:{palette:{primary:U.a,secondary:G.a,error:G.a},typography:{fontColor:G.a}}},{id:"amber",color:W.a[500],source:{palette:{primary:W.a,secondary:Q.a,error:G.a}}},{id:"orange",color:Z.a[500],source:{palette:{primary:Z.a,secondary:Q.a,error:G.a}}}],ee=function(e){var t=e.intl,n=e.updateLocale,o=e.locale,s=e.menuContext,r=e.themeContext,i=e.a2HSContext,l=e.auth,c=s.isDesktop,u=s.isAuthMenuOpen,d=s.useMiniMode,m=s.setMiniMode,p=r.themeID,b=r.setThemeID,f=(l.auth,l.setAuth),j=i.isAppInstallable,h=i.isAppInstalled,g=i.deferredPrompt,x=y.map((function(e){return{value:void 0,visible:!0,primaryText:t.formatMessage({id:e.locale}),onClick:function(){n(e.locale)},leftIcon:Object(a.jsx)(N.a,{})}})),O=!0,v=$.map((function(e){return{value:void 0,visible:!0,primaryText:t.formatMessage({id:e.id}),onClick:function(){b(e.id)},leftIcon:Object(a.jsx)(S.a,{style:{color:e.color}})}}));return u?[{value:"/hyld/signin",onClick:function(){f({isAuthenticated:!1})},visible:!0,primaryText:t.formatMessage({id:"sign_out"}),leftIcon:Object(a.jsx)(C.a,{})}]:[{value:"/hyld/home",visible:O,primaryText:"Dividends",leftIcon:Object(a.jsx)(X.a,{})},{primaryText:"Xyz",primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(F.a,{}),nestedItems:[{value:"/hyld/about",visible:O,primaryText:"Support",leftIcon:Object(a.jsx)(I.a,{})}]},{value:"/hyld/about",visible:!0,primaryText:t.formatMessage({id:"about"}),leftIcon:Object(a.jsx)(A.a,{})},{divider:!0},{primaryText:t.formatMessage({id:"settings"}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(E.a,{}),nestedItems:[{primaryText:t.formatMessage({id:"theme"}),secondaryText:t.formatMessage({id:p}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(S.a,{}),nestedItems:v},{primaryText:t.formatMessage({id:"language"}),secondaryText:t.formatMessage({id:o}),primaryTogglesNestedList:!0,leftIcon:Object(a.jsx)(N.a,{}),nestedItems:x},{visible:!!c,onClick:function(){m(!d)},primaryText:t.formatMessage({id:"menu_mini_mode"}),leftIcon:d?Object(a.jsx)(_.a,{}):Object(a.jsx)(T.a,{})}]},{value:null,visible:j&&!h,onClick:function(){g.prompt()},primaryText:t.formatMessage({id:"install",defaultMessage:"Install"}),leftIcon:Object(a.jsx)(L.a,{})}]},te=n(109),ne={routes:x,locale:{locales:y,defaultLocale:n.n(te)()(["en","de","ru"],"en"),onError:function(e){}},menu:{getMenuItems:ee},theme:{themes:$,defaultThemeID:"default",defaultType:"light"},pages:{LandingPage:Object(o.lazy)((function(){return n.e(17).then(n.bind(null,554))})),PageNotFound:Object(o.lazy)((function(){return n.e(18).then(n.bind(null,555))}))}},ae=f()(p.a,ne),oe=function(e){Object(l.a)(n,e);var t=Object(c.a)(n);function n(){return Object(r.a)(this,n),t.apply(this,arguments)}return Object(i.a)(n,[{key:"render",value:function(){return Object(a.jsx)(d.a,{config:ae})}}]),n}(o.Component);Object(s.render)(Object(a.jsx)(oe,{}),document.getElementById("root"))}},[[318,1,2]]]);
//# sourceMappingURL=main.bbe73802.chunk.js.map