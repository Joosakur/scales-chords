import * as React from 'react'
import { connect } from 'react-redux'
import { Header } from 'semantic-ui-react'

import { RootState, ScaleDetails } from '../../types'

export interface StateProps {
    scaleDetails: ScaleDetails | null
}

type Props = StateProps

export const ScaleView: React.FunctionComponent<Props> = props => {
    const { scaleDetails } = props

    if (!scaleDetails) return null

    return (
        <React.Fragment>
            <Header as='h2'>
                Scale: {scaleDetails.namePrimary}
                { scaleDetails.nameSecondaries.length > 0 &&
                    <Header.Subheader>Also known as: {scaleDetails.nameSecondaries.join(', ')}</Header.Subheader>
                }
            </Header>
        </React.Fragment>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        scaleDetails: state.scale.details,
    }
}

export default connect(mapStateToProps)(ScaleView)
