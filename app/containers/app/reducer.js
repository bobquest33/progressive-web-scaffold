import {createReducer} from 'redux-act'
import {Map, fromJS} from 'immutable'
import _messages from '../../config/translations'
import * as appActions from './actions'

const messages = fromJS(_messages)
const locale = window.navigator.language.toLowerCase()
const initialState = Map({
    locale,
    messages: messages.get(locale)
})

export default createReducer({
    [appActions.setLocale]: (state, payload) => {
        return state.merge({
            locale: payload,
            messages: messages.get(payload)
        })
    }
}, initialState)
