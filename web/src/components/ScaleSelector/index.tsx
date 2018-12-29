import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkDispatch } from 'redux-thunk'
import { Segment, Header, Grid, GridColumn } from 'semantic-ui-react'

import RootSelector from './RootSelector'
import ScaleSearch from './ScaleSearch'
import { QualifiedTone, RootState } from '../../types'
import { loadScale } from '../../actions/thunks/scales'
import { scaleRootSelected, scaleTypeSelected } from '../../actions/scale'

export interface DispatchProps {
    selectScale: (scaleNumber: number, root: QualifiedTone) => any,
    selectRoot: (root: QualifiedTone) => any,
    selectScaleType: (scaleNumber: number) => any,
}

export interface StateProps {
    root: QualifiedTone,
    scaleNumber: number | null
}

type Props = StateProps & DispatchProps

export const ScaleSelector: React.FunctionComponent<Props> = props => {
    const { scaleNumber, root, selectScale, selectScaleType, selectRoot } = props

    const onRootSelected = (newRoot: QualifiedTone) => {
        selectRoot(newRoot)
        if (scaleNumber && Number.isInteger(scaleNumber)) selectScale(scaleNumber, newRoot)
    }
    const onScaleTypeSelected = (newScaleNumber: number) => {
        selectScaleType(newScaleNumber)
        if (newScaleNumber && Number.isInteger(newScaleNumber)) selectScale(newScaleNumber, root)
    }

    return (
        <Segment>
            <Grid>
                <GridColumn width={6}>
                    <Header as='h3'>Select root note</Header>
                    <RootSelector root={root} onRootSelected={onRootSelected}/>
                </GridColumn>
                <GridColumn width={10}>
                    <Header as='h3'>Select scale type</Header>
                    <ScaleSearch onScaleTypeSelected={onScaleTypeSelected}/>
                </GridColumn>
            </Grid>
        </Segment>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        root: state.scale.root,
        scaleNumber: state.scale.scaleNumber,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): DispatchProps {
    return {
        selectScale: (scaleNumber: number, root: QualifiedTone) => {
            dispatch(loadScale(scaleNumber, root))
        },
        selectRoot: (root: QualifiedTone) => {
            dispatch(scaleRootSelected(root))
        },
        selectScaleType: (scaleNumber: number) => {
            dispatch(scaleTypeSelected(scaleNumber))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSelector)
