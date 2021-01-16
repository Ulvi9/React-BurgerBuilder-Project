import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createStore,applyMiddleware ,compose,combineReducers} from "redux";
import thunk from "redux-thunk"
import burgerBuilderReducer from "./store/reducers/burgerBuilder";
import orderReducer from './store/reducers/order'

const rootReducer=combineReducers({
    orderR:orderReducer,
    burgerBuilder:burgerBuilderReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));
ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <BrowserRouter>
              <App/>
          </BrowserRouter>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// const logger=store=>{
//     return next=>{
//         return action=>{
//             console.log("middle ware",action)
//             const result=next(action)
//             console.log(store.getState)
//             return result;
//         }
//     }
// }
//
// const store=createStore(burgerBuilder,applyMiddleware(logger));
