import * as React from 'react'
import { connect } from 'react-redux'
import { Segment, Grid, GridColumn } from 'semantic-ui-react'

import { RootState, ScaleDetails } from '../../types'

import ScaleNameView from './ScaleNameView'
import ScaleNotesView from './ScaleNotesView'
import ScalePlayer from './ScalePlayer'

export interface StateProps {
    scaleDetails: ScaleDetails | null
}

type Props = StateProps

export const ScaleView: React.FunctionComponent<Props> = props => {
    const { scaleDetails } = props

    if (!scaleDetails) return null

    const { namePrimary, nameSecondaries, tones } = scaleDetails

    return (
        <Segment>
            <Grid>
                <GridColumn width={12}>
                    <ScaleNameView primaryName={namePrimary} secondaryNames={nameSecondaries}/>
                </GridColumn>
                <GridColumn width={4} textAlign='right'>
                    <ScalePlayer notes={tones}/>
                </GridColumn>
                {
                    tones && tones.length > 0 ?
                        (
                            <GridColumn width={16}>
                                <ScaleNotesView notes={tones}/>
                            </GridColumn>
                        ) :
                        (
                            <p>Could not form the scale presentation, try
                                some other enharmonically equivalent root</p>
                        )
                }
            </Grid>
        </Segment>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        scaleDetails: state.scale.details,
    }
}

export default connect(mapStateToProps)(ScaleView)
