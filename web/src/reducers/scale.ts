import { getType } from 'typesafe-actions'

import { ScaleState } from '../types'
import * as uiScaleActions from '../actions/ui/scale'
import { UIScaleAction } from '../actions/types'

export default function scaleReducer(state: ScaleState, action: UIScaleAction): ScaleState {
    switch (action.type) {
        case getType(uiScaleActions.scaleSearchInputChanged):
            return {
                ...state,
                search: {
                    ...state.search,
                    value: action.payload,
                },
            }
    }
    return state
}
