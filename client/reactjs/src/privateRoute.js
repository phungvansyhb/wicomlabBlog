import React from 'react';
import {Redirect, Route} from 'react-router-dom'

function PrivateRoute({children ,...rest}) {
    // ...rest => con nhieu parameters nua nhung chua biet khai bao the nao
    let flag = localStorage.getItem('islogin');
    return (
        <Route {...rest} render={() => (flag==='true') ? (children) : <Redirect to={{pathname:'/login',state:'you need login to use resource'}}/>}></Route>
    )
}

export default PrivateRoute;