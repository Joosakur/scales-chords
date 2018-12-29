import {
    ScaleSearchInputChangedAction,
    ScaleRootSelectedAction,
    ScaleTypeSelectedAction,
} from './scale'
import {
    QueryScalesSuccessAction,
    QueryScalesFailedAction,
    QueryScalesStartedAction,
    LoadScaleStartedAction,
    LoadScaleSuccessAction,
    LoadScaleFailedAction,
} from './thunks/scales'

export type RootAction =
    ScaleSearchInputChangedAction |
    ScaleRootSelectedAction |
    ScaleTypeSelectedAction |
    QueryScalesStartedAction | QueryScalesSuccessAction | QueryScalesFailedAction |
    LoadScaleStartedAction | LoadScaleSuccessAction | LoadScaleFailedAction
