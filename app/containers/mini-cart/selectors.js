import {createSelector} from 'reselect'
import {createGetSelector} from '../../utils/selector-utils'
import * as globalSelectors from '../../store/selectors'

export const getMiniCart = createSelector(
    globalSelectors.getUi,
    ({miniCart}) => miniCart
)

export const getCartObject = createGetSelector(getMiniCart, 'cart')
export const getMiniCartContentsLoaded = createGetSelector(getMiniCart, 'contentsLoaded')
export const getMiniCartIsOpen = createGetSelector(getMiniCart, 'isOpen')
export const getMiniCartItems = createGetSelector(getCartObject, 'items')
export const getMiniCartSubtotal = createGetSelector(getCartObject, 'subtotal')
export const getMiniCartHasItems = createSelector(
    getMiniCartItems,
    (items) => items.size > 0
)
