import { Store } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer, {initialState} from './reducers/root'
import { RootState } from './types'

const middleware: any [] = [
    thunk,
]

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store as Store<RootState>
