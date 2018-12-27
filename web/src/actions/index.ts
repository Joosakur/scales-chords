import { UIScaleAction } from './ui/scale'
import {
    QueryScalesSuccessAction,
    QueryScalesFailedAction,
    QueryScalesStartedAction,
    LoadScaleStartedAction,
    LoadScaleSuccessAction,
    LoadScaleFailedAction,
} from './thunks/scales'

export type RootAction =
    UIScaleAction |
    QueryScalesStartedAction | QueryScalesSuccessAction | QueryScalesFailedAction |
    LoadScaleStartedAction | LoadScaleSuccessAction | LoadScaleFailedAction
