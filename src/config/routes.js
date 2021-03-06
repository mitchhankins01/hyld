/* eslint-disable react/jsx-key */
import React, { lazy } from 'react'
import AuthorizedRoute from 'base-shell/lib/components/AuthorizedRoute/AuthorizedRoute'
import UnauthorizedRoute from 'base-shell/lib/components/UnauthorizedRoute/UnauthorizedRoute'
import { Route } from 'react-router-dom'

const SignIn = lazy(() => import('../pages/SignIn/SignIn'))
const SignUp = lazy(() => import('../pages/SignUp/SignUp'))
const PasswordReset = lazy(() => import('../pages/PasswordReset/PasswordReset'))
const About = lazy(() => import('../pages/About'))
const Home = lazy(() => import('../pages/Home/Home'))
const HomeTable = lazy(() => import('../pages/Home/HomeTable'))
const DialogDemo = lazy(() => import('../pages/DialogDemo/DialogDemo'))
const ToastDemo = lazy(() => import('../pages/ToastDemo/ToastDemo'))
const FilterDemo = lazy(() => import('../pages/FilterDemo'))
const ListPageDemo = lazy(() => import('../pages/ListPageDemo'))
const TabsDemo = lazy(() => import('../pages/TabsDemo'))

const routes = [
  // <UnauthorizedRoute path="/hyld/signin" redirectTo="/" exact component={SignIn} />,
  // <UnauthorizedRoute path="/hyld/signup" redirectTo="/" exact component={SignUp} />,
  // <UnauthorizedRoute
  //   path="/hyld/password_reset"
  //   redirectTo="/"
  //   exact
  //   component={PasswordReset}
  // />,
  <Route path="/hyld" exact redirect='/hyld/home' />,
  <Route path="/hyld/about" exact component={About} />,
  <Route path="/hyld/home" exact component={Home} />,
  <Route path="/hyld/hometable" exact component={HomeTable} />,
  // <AuthorizedRoute path="/dialog_demo" exact component={DialogDemo} />,
  // <AuthorizedRoute path="/toast_demo" exact component={ToastDemo} />,
  // <AuthorizedRoute path="/filter_demo" exact component={FilterDemo} />,
  // <AuthorizedRoute path="/list_page_demo" exact component={ListPageDemo} />,
  // <AuthorizedRoute path="/tabs_demo" exact component={TabsDemo} />,
]

export default routes
