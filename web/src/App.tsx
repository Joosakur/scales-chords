import * as React from 'react'
import { Provider } from 'react-redux'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import store from './store'
import MainContainer from './components/MainContainer'

class App extends React.Component {
  public render() {
    return (
        <Provider store={store}>
            <MainContainer/>
        </Provider>
    )
  }
}

export default App
