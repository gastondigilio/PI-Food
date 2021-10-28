import {createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk"; 
import rootReducer from '../reducers/index.js';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

//cuando crea el store estoy creando el estado de redux 