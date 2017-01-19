import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {stripEvent} from '../../../utils/utils'

import {HeaderBar, HeaderBarActions, HeaderBarTitle} from 'progressive-web-sdk/dist/components/header-bar'
import IconLabelButton from '../../../components/icon-label-button'

import * as actions from '../actions'

const MiniCartHeader = ({closeMiniCart}) => (
    <HeaderBar>
        <HeaderBarTitle className="u-flex u-padding-start u-text-align-start">
            <h2 className="t-mini-cart__title u-heading-family u-text-uppercase">
                <span className="u-text-lighter">Shopping</span> Cart
            </h2>
        </HeaderBarTitle>

        <HeaderBarActions>
            <IconLabelButton iconName="close" label="close" onClick={closeMiniCart}>Close</IconLabelButton>
        </HeaderBarActions>
    </HeaderBar>
)

MiniCartHeader.propTypes = {
    closeMiniCart: PropTypes.func
}

const mapDispatchToProps = {
    closeMiniCart: stripEvent(actions.closeMiniCart)
}

export default connect(() => ({}), mapDispatchToProps)(MiniCartHeader)
