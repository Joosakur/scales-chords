import { QualifiedTone } from '../types'

export interface ScaleSearchInputChangedAction {
    type: 'SCALE_SEARCH_INPUT_CHANGED',
    value: string
}

export const scaleSearchInputChanged = (value: string): ScaleSearchInputChangedAction => ({
    type: 'SCALE_SEARCH_INPUT_CHANGED', value,
})

export interface ScaleTypeSelectedAction {
    type: 'SCALE_TYPE_SELECTED',
    scaleNumber: number
}

export const scaleTypeSelected = (scaleNumber: number): ScaleTypeSelectedAction => ({
    type: 'SCALE_TYPE_SELECTED', scaleNumber,
})

export interface ScaleRootSelectedAction {
    type: 'SCALE_ROOT_SELECTED',
    root: QualifiedTone
}

export const scaleRootSelected = (root: QualifiedTone): ScaleRootSelectedAction => ({
    type: 'SCALE_ROOT_SELECTED', root,
})
