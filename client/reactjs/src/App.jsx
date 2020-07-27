import React from 'react';
import 'antd/dist/antd.css'
import {BrowserRouter, Route , Switch } from "react-router-dom"
import PrivateRoute from "./privateRoute";
import Page404 from "./components/pages/page404";
import Home from "./components/pages/home";
import Login from "./components/pages/login";
import SignUp from "./components/pages/signUp";
import PublicPage from "./components/pages/publicPage";
import ProtectedPage from "./components/pages/protectedPage";
function App() {
  return (
      <BrowserRouter>
              <Switch>
                    {/*<Route path="/" component ={...}/>*/}
                    <Route path="/" exact><Home/></Route>
                    <Route path="/login" component = {Login}></Route>
                    <Route path="/signup" component={SignUp}></Route>
                    <Route path="/public" component={PublicPage}></Route>
                  <PrivateRoute path='/protected'  ><ProtectedPage/></PrivateRoute>
                    <Route path="*"><Page404/></Route>

              </Switch>

      </BrowserRouter>
  )
}

export default App;
