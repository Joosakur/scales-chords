import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { playChord } from '../../../player'
import { QualifiedTone } from '../../../types'

export interface Props {
    notes: QualifiedTone []
}

export const ScalePlayer: React.FunctionComponent<Props> = props => {
    const { notes } = props

    const play = () => {
        if (notes.length === 0) return

        const notesEndingWithFirst = [...notes, notes[0]]
        playChord([...notesEndingWithFirst], 2, 0.5)
    }

    return (
        <React.Fragment>
            <Button onClick={play}>Play the scale</Button>
        </React.Fragment>
    )
}

export default ScalePlayer
