import * as React from 'react'
import { Dropdown, Grid, GridColumn } from 'semantic-ui-react'

import { BaseTone, ToneQualifier, QualifiedTone } from '../../../types'

interface RootBaseOption {
    text: string,
    value: BaseTone
}

interface RootQualifierOption {
    text: string,
    value: 'b' | 'n' | '#'
}

export interface Props {
    root: QualifiedTone,
    onRootSelected: (root: QualifiedTone) => void
}

export const RootSelector: React.FunctionComponent<Props> = props => {
    const { root, onRootSelected } = props

    const rootBaseOptions: RootBaseOption [] = [
        { text: 'C', value: 'C' },
        { text: 'D', value: 'D' },
        { text: 'E', value: 'E' },
        { text: 'F', value: 'F' },
        { text: 'G', value: 'G' },
        { text: 'A', value: 'A' },
        { text: 'B', value: 'B' },
    ]

    const rootQualifierOptions: RootQualifierOption [] = [
        { text: '\u266d', value: 'b' },
        { text: '\u266e', value: 'n' },
        { text: '\u266f', value: '#' },
    ]

    const onRootBaseChanged = (e: any, data: any) => {
        const value: BaseTone = data.value
        const newRoot: QualifiedTone = { base: value, qualifier: root.qualifier }
        onRootSelected(newRoot)
    }

    const onRootQualifierChanged = (e: any, data: any) => {
        const option: RootQualifierOption = data
        let newQualifier: ToneQualifier = null
        switch (option.value) {
            case 'b':
                newQualifier = 'b'
                break
            case '#':
                newQualifier = '#'
                break
        }
        const newRoot: QualifiedTone = { base: root.base, qualifier: newQualifier }
        onRootSelected(newRoot)
    }

    return (
        <React.Fragment>
            <Grid columns='equal' verticalAlign='middle'>
                <GridColumn stretched>
                    <Dropdown fluid selection
                              options={rootBaseOptions}
                              onChange={onRootBaseChanged}
                              value={root.base}/>
                </GridColumn>
                <GridColumn stretched>
                    <Dropdown fluid selection
                              options={rootQualifierOptions}
                              onChange={onRootQualifierChanged}
                              value={root.qualifier || 'n'} />
                </GridColumn>
            </Grid>
        </React.Fragment>
    )
}

export default RootSelector
