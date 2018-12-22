import scaleReducer from './scale'
import { RootAction } from '../actions/types'
import { RootState } from '../types'

export const initialState: RootState = {
    scale: {
        search: {
            value: '',
            results: [],
            isLoading: false,
        },
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
