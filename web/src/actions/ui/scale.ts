export interface ScaleSearchInputChangedAction {
    type: 'UI__SCALE__SEARCH_INPUT_CHANGED',
    value: string
}

export const scaleSearchInputChanged = (value: string): ScaleSearchInputChangedAction => {
    return { type: 'UI__SCALE__SEARCH_INPUT_CHANGED', value }
}

export type UIScaleAction = ScaleSearchInputChangedAction
