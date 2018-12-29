import scaleReducer from './scale'
import { RootAction } from '../actions'
import { RootState } from '../types'

export const initialState: RootState = {
    scale: {
        search: {
            value: '',
            results: [],
            isLoading: false,
        },
        details: null,
        root: {
            base: 'C',
            qualifier: null,
        },
        scaleNumber: null,
    },
}

export default function(state: RootState | undefined, action: RootAction): RootState {
    if (!state) state = {
        ...initialState,
    }

    return {
        scale: scaleReducer(state.scale, action),
    }
}
