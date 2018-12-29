import * as React from 'react'
import { Header } from 'semantic-ui-react'

interface Props {
    primaryName: string,
    secondaryNames: string []
}

const ScaleNameView: React.FunctionComponent<Props> = (props: Props) => {
    const { primaryName, secondaryNames } = props

    return (
        <React.Fragment>
            <Header as='h2'>
                Scale: {primaryName}
                { secondaryNames.length > 0 &&
                <Header.Subheader>Also known as: {secondaryNames.join(', ')}</Header.Subheader>
                }
            </Header>
        </React.Fragment>
    )
}

export default ScaleNameView
