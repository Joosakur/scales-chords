import { createStandardAction } from 'typesafe-actions'

export const scaleSearchInputChanged = createStandardAction('ui/scale/SEARCH_INPUT_CHANGED')<string>()
