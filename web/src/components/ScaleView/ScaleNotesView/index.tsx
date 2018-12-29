import * as React from 'react'
import { Grid, GridColumn } from 'semantic-ui-react'

import ScaleNoteView from './ScaleNoteView'
import { QualifiedTone } from '../../../types'

interface Props {
    notes: QualifiedTone []
}

const ScaleNotesView: React.FunctionComponent<Props> = (props: Props) => {
    const { notes } = props

    return (
        <React.Fragment>
            <Grid columns='equal'>
                {
                    notes.map(note => (
                        <GridColumn key={note.base}>
                            <ScaleNoteView note={note}/>
                        </GridColumn>
                    ))
                }
            </Grid>
        </React.Fragment>
    )
}

export default ScaleNotesView
