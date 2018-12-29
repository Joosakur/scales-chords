import * as React from 'react'
import { Button } from 'semantic-ui-react'

import { QualifiedTone } from '../../../../types'
import { playNote } from '../../../../player'

interface Props {
    note: QualifiedTone
}

const ScaleNoteView: React.FunctionComponent<Props> = (props: Props) => {
    const { note } = props
    const { base, qualifier } = note

    const prettyQualifier = (qualifier || '').replace(/b/g, '\u266d').replace(/#/g, '\u266f')
    return (
        <Button onClick={() => playNote(note)} circular size='big'>
            {`${base}${prettyQualifier}`}
        </Button>
    )
}

export default ScaleNoteView
