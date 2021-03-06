import * as React from 'react'
import { Container, Header } from 'semantic-ui-react'
import ScaleSelector from './ScaleSelector'
import ScaleView from './ScaleView'
import ChordTable from './ChordTable'

const MainContainer: React.FunctionComponent = () => {
    return (
        <Container text style={{ padding: '2em 0em' }} >
            <Header as='h1'>Scales and Chords</Header>
            <ScaleSelector/>
            <ScaleView/>
            <ChordTable/>
        </Container>
    )
}

export default MainContainer
