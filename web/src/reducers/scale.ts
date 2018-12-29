import { ScaleState } from '../types'
import { RootAction } from '../actions'

export default function scaleReducer(state: ScaleState, action: RootAction): ScaleState {
    switch (action.type) {
        case 'SCALE_SEARCH_INPUT_CHANGED':
            return {
                ...state,
                search: { ...state.search, value: action.value },
            }

        case 'SCALE_ROOT_SELECTED':
            return {
                ...state,
                root: action.root,
            }

        case 'SCALE_TYPE_SELECTED':
            return {
                ...state,
                scaleNumber: action.scaleNumber,
            }

        case 'THUNK__SCALES__QUERY_STARTED':
            return {
                ...state,
                search: {
                    ...state.search,
                    isLoading: true,
                },
            }
        case 'THUNK__SCALES__QUERY_SUCCESS':
            return {
                ...state,
                search: {
                    ...state.search,
                    results: action.results,
                    isLoading: false,
                },
            }
        case 'THUNK__SCALES__QUERY_FAILED':
            return {
                ...state,
                search: {
                    ...state.search,
                    results: [],
                    isLoading: false,
                },
            }

        case 'THUNK__SCALES__LOAD_STARTED':
            return { ...state, details: null }
        case 'THUNK__SCALES__LOAD_SUCCESS':
            return {
                ...state,
                details: {
                    ...action.details,
                },
            }
        case 'THUNK__SCALES__LOAD_FAILED':
            return { ...state, details: null }
    }
    return state
}
