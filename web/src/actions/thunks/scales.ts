import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import axios from 'axios'

import { ScaleListEntry, ScaleDetails } from '../../types'

export const queryScales = (q: string): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        dispatch(queryScalesStarted())
        axios.get(`http://localhost:3000/scale-types?name=${q}`)
            .then(res => dispatch(queryScalesSuccess(res.data)))
            .catch(err => dispatch(queryScalesFailed()))
    }
}

export interface QueryScalesStartedAction {
    type: 'THUNK__SCALES__QUERY_STARTED'
}
const queryScalesStarted = (): QueryScalesStartedAction => {
    return { type: 'THUNK__SCALES__QUERY_STARTED' }
}

export interface QueryScalesSuccessAction {
    type: 'THUNK__SCALES__QUERY_SUCCESS',
    results: ScaleListEntry []
}
const queryScalesSuccess = (results: ScaleListEntry []): QueryScalesSuccessAction => {
    return { type: 'THUNK__SCALES__QUERY_SUCCESS', results }
}

export interface QueryScalesFailedAction {
    type: 'THUNK__SCALES__QUERY_FAILED'
}
const queryScalesFailed = (): QueryScalesFailedAction => {
    return { type: 'THUNK__SCALES__QUERY_FAILED' }
}

export const loadScale = (scaleNumber: number): ThunkAction<void, {}, {}, AnyAction> => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>): void => {
        dispatch(loadScaleStarted())
        axios.get(`http://localhost:3000/scales/${scaleNumber}`)
            .then(res => dispatch(loadScaleSuccess(res.data)))
            .catch(err => dispatch(loadScaleFailed()))
    }
}

export interface LoadScaleSuccessAction {
    type: 'THUNK__SCALES__LOAD_SUCCESS',
    details: ScaleDetails
}
const loadScaleSuccess = (details: ScaleDetails): LoadScaleSuccessAction => {
    return { type: 'THUNK__SCALES__LOAD_SUCCESS', details }
}

export interface LoadScaleFailedAction {
    type: 'THUNK__SCALES__LOAD_FAILED'
}
const loadScaleFailed = (): LoadScaleFailedAction => {
    return { type: 'THUNK__SCALES__LOAD_FAILED' }
}

export interface LoadScaleStartedAction {
    type: 'THUNK__SCALES__LOAD_STARTED'
}
const loadScaleStarted = (): LoadScaleStartedAction => {
    return { type: 'THUNK__SCALES__LOAD_STARTED' }
}
