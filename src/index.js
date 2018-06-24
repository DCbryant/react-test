import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import store from './store';
import { Home, Login, Register } from './containers';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <Switch>
                    <Route path="/home" component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <Route component={Home}/>
                </Switch>
            </div>   
        </BrowserRouter>
    </Provider>, 
    document.getElementById('root')
);

