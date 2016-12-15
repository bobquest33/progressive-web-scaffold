import {createReducer} from 'redux-act'
import Immutable from 'immutable'
import * as checkoutConfirmationActions from './actions'

const initialState = Immutable.fromJS({
    contentsLoaded: true,
    emailAddress: 'mlenton@mobify.com',
    orderNumber: '000000005'
})

export default createReducer({
    [checkoutConfirmationActions.receiveContents]: (state, payload) => {
        return state.mergeDeep(payload, {contentsLoaded: true})
    }
}, initialState)
