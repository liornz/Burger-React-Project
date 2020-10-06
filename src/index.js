import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import createSagaMiddleware from 'redux-saga';
import orderReducer from './store/reducers/order';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import authReducer from './store/reducers/auth';
import './index.css';
import App from './App';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas/index';

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer, 
    order: orderReducer,
    auth: authReducer
});

const SagaMiddleware = createSagaMiddleware();

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk, SagaMiddleware)
));

SagaMiddleware.run(watchAuth);
SagaMiddleware.run(watchBurgerBuilder);
SagaMiddleware.run(watchOrders);


const app = (
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>
);

ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
