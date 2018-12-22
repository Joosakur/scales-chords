import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import {Search, SearchProps, Segment} from 'semantic-ui-react'

import { RootState, ScaleListEntry } from '../../types'
import { RootAction } from '../../actions/types'
import { scaleSearchInputChanged } from '../../actions/ui/scale'

export interface Props {
    isLoading: boolean,
    value: string,
    results: ScaleListEntry [],
    scaleSearchInputChanged: (value: string) => any
}

export const ScaleSegment: React.FunctionComponent<Props> = props => {
    const {isLoading, value, results, scaleSearchInputChanged} = props

    const handleSearchChange = (e: any, obj: SearchProps) => {
        console.log('querying for.. ' + obj.value)
        scaleSearchInputChanged(obj.value ? obj.value.toString() : '')
    }

    const handleResultSelect: (e: any, obj: { result: ScaleListEntry }) => void = (e, { result }) => {
        console.log('selected result: ' + result)
    }

    return (
        <Segment vertical>
            <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={results}
                value={value}
            />
        </Segment>
    )
}

function mapStateToProps(state: RootState) {
    return {
        isLoading: state.scale.search.isLoading,
        value: state.scale.search.value,
        results: state.scale.search.results,
    }
}

function mapDispatchToProps(dispatch: Dispatch<RootAction>) {
    return {
        scaleSearchInputChanged: (value: string) => dispatch(scaleSearchInputChanged(value)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSegment)
