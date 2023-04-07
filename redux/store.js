import { createStore, applyMiddleware} from "redux"
import logger from "redux-logger"
import thunk from "redux-thunk"
import { createWrapper} from "next-redux-wrapper"
import rootReducer from "./rootReducer"

const middleware = [thunk]

if(process.env.NODE_ENV==="development") {
    middleware.push(logger)
}

export const store = createStore(rootReducer, applyMiddleware(...middleware))

const makeStore = () => store;
export const wrapper = createWrapper(makeStore)