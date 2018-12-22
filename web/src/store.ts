import { Store } from 'react-redux'
import rootReducer, {initialState} from './reducers/root'
import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { RootState } from './types'

const middleware: any [] = []

const composedEnhancers = composeWithDevTools(
    applyMiddleware(...middleware),
)

const store = createStore(rootReducer, initialState, composedEnhancers)

export default store as Store<RootState>
