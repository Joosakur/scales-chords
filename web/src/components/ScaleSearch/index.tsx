import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { Search, SearchProps, Segment } from 'semantic-ui-react'

import { RootState, ScaleListEntry } from '../../types'
import { scaleSearchInputChanged } from '../../actions/ui/scale'
import { queryScales, loadScale } from '../../actions/thunks/scales'

export interface DispatchProps {
    scaleSearchInputChanged: (value: string) => any,
    scaleSelected: (scaleNumber: number) => any
}

export interface StateProps {
    isLoading: boolean,
    value: string,
    results: ScaleListEntry [],
}

type Props = StateProps & DispatchProps

interface SearchResult {
    title: string,
    num: number
}

export const ScaleSearch: React.FunctionComponent<Props> = props => {
    const { isLoading, value, results, scaleSearchInputChanged, scaleSelected } = props

    const handleSearchChange = (e: any, obj: SearchProps) => {
        scaleSearchInputChanged(obj.value ? obj.value.toString() : '')
    }

    const handleResultSelect: (e: any, obj: { result: SearchResult }) => void = (e, { result }) => {
        scaleSelected(result.num)
        scaleSearchInputChanged('')
    }

    const getFormattedResults = (): SearchResult [] => results.map(
        res => ({ title: res.name, num: res.scaleNumber }),
    )

    return (
        <Segment vertical>
            <Search
                loading={isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={handleSearchChange}
                results={getFormattedResults()}
                value={value}
            />
        </Segment>
    )
}

function mapStateToProps(state: RootState): StateProps {
    return {
        isLoading: state.scale.search.isLoading,
        value: state.scale.search.value,
        results: state.scale.search.results,
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<{}, {}, any>): DispatchProps {
    return {
        scaleSearchInputChanged: (value: string) => {
            dispatch(scaleSearchInputChanged(value))
            if (value.length > 0) dispatch(queryScales(value))
        },
        scaleSelected: (scaleNumber: number) => {
            dispatch(loadScale(scaleNumber))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSearch)
