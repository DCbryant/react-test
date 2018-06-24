import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {HashRouter ,Route,Switch} from 'react-router-dom';
import store from './store';
import { Home, Login, Register, ResetPass } from './containers';
// HashRouter github page才能正常访问
ReactDOM.render(
    <Provider store={store}>
        <HashRouter >
            <div>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route path="/resetPass" component={ResetPass} />
                    <Route component={Home}/>
                </Switch>
            </div>   
        </HashRouter >
    </Provider>, 
    document.getElementById('root')
);

