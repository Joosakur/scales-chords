import * as React from 'react'
import { connect } from 'react-redux'
import { Segment, Table, TableHeader, TableRow, TableHeaderCell, TableBody, TableCell, Button } from 'semantic-ui-react'

import { RootState, ScaleDegree } from '../../types'
import { playChord } from '../../player'

export interface StateProps {
    scaleDegrees: ScaleDegree [] | null
}

type Props = StateProps

export const ChordTable: React.FunctionComponent<Props> = props => {
    const { scaleDegrees } = props

    if (!scaleDegrees) return null

    const groups = ['triads', 'sevenths', 'suspended']

    return (
        <Segment>
            <Table fixed>
                <TableHeader>
                    <TableRow textAlign='center'>
                        <TableHeaderCell></TableHeaderCell>
                        <TableHeaderCell>I</TableHeaderCell>
                        <TableHeaderCell>II</TableHeaderCell>
                        <TableHeaderCell>III</TableHeaderCell>
                        <TableHeaderCell>IV</TableHeaderCell>
                        <TableHeaderCell>V</TableHeaderCell>
                        <TableHeaderCell>VI</TableHeaderCell>
                        <TableHeaderCell>VII</TableHeaderCell>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        groups.map(groupName => (
                            <TableRow key={groupName}>
                                <TableCell>{groupName}</TableCell>
                                {
                                    scaleDegrees.map(degree => (
                                        <TableCell key={degree.degree}>
                                            {(degree.chordGroups [groupName] || []).map(chord => (
                                                <Button
                                                    onClick={() => playChord(chord.tones)}
                                                    style={{width: '100%', padding: '1rem 0', margin: '3px'}}>
                                                    {chord.shortName}
                                                </Button>
                                            ))}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </Segment>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        scaleDegrees: state.scale.details && state.scale.details.scaleDegrees,
    }
}

export default connect(mapStateToProps)(ChordTable)
