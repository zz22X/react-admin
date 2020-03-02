//引入creatStore 用于创建redux最核心的store
import { createStore, applyMiddleware } from "redux"
//引入 reducer 用于真正操作状态
import reducer from "./reducers/index"
//引入redux-thunk 用于处理异步action
import thunk from 'redux-thunk'
//引入redux-devtools-extension 用于支持redux 开发者工具
import { composeWithDevTools } from 'redux-devtools-extension'
export default createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))