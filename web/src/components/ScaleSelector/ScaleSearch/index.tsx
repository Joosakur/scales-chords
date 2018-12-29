import * as React from 'react'
import { ThunkDispatch } from 'redux-thunk'
import { connect } from 'react-redux'
import { Search, SearchProps, Segment } from 'semantic-ui-react'

import { RootState, ScaleListEntry } from '../../../types'
import { scaleSearchInputChanged } from '../../../actions/scale'
import { queryScales } from '../../../actions/thunks/scales'

export interface StateProps {
    isLoading: boolean,
    value: string,
    results: ScaleListEntry []
}

export interface DispatchProps {
    changeScaleSearchInput: (value: string) => any,
}

export interface OwnProps {
    onScaleTypeSelected: (scaleNumber: number) => void
}

type Props = StateProps & DispatchProps & OwnProps

interface SearchResult {
    title: string,
    num: number
}

export const ScaleSearch: React.FunctionComponent<Props> = props => {
    const { isLoading, value, results, changeScaleSearchInput, onScaleTypeSelected } = props

    const handleSearchChange = (e: any, obj: SearchProps) => {
        changeScaleSearchInput(obj.value ? obj.value.toString() : '')
    }

    const handleResultSelect: (e: any, obj: { result: SearchResult }) => void = (e, { result }) => {
        onScaleTypeSelected(result.num)
        changeScaleSearchInput('')
    }

    const getFormattedResults = (): SearchResult [] => results.map(
        res => ({ title: res.name, num: res.scaleNumber }),
    )

    return (
        <Search
            loading={isLoading}
            onResultSelect={handleResultSelect}
            onSearchChange={handleSearchChange}
            results={getFormattedResults()}
            value={value}
            fluid
            size={'large'}
            className='full-width-search'
        />
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
        changeScaleSearchInput: (value: string) => {
            dispatch(scaleSearchInputChanged(value))
            if (value.length > 0) dispatch(queryScales(value))
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScaleSearch)
