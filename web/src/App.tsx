import * as React from 'react'
import { Provider } from 'react-redux'
import { Container, Header } from 'semantic-ui-react'

import 'semantic-ui-css/semantic.min.css'
import './App.css'

import store from './store'
import ScaleSearch from './components/ScaleSearch'
import ScaleView from './components/ScaleView'

class App extends React.Component {
  public render() {
    return (
        <Provider store={store}>
            <Container text style={{ padding: '2em 0em' }} >
                <Header as='h1'>Scales and Chords</Header>
                <ScaleSearch/>
                <ScaleView/>
            </Container>
        </Provider>
    )
  }
}

export default App
