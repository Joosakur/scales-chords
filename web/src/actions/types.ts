import { ActionType } from 'typesafe-actions'

import * as uiScaleActions from './ui/scale'

export type UIScaleAction = ActionType<typeof uiScaleActions>

export type RootAction = UIScaleAction
