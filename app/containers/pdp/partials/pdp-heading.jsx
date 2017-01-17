import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {createStructuredSelector} from 'reselect'
import * as selectors from '../selectors'

import SkeletonBlock from 'progressive-web-sdk/dist/components/skeleton-block'

const PDPHeading = ({title, price}) => (
    <div className="t-pdp-heading u-padding-md u-box-shadow u-position-relative u-z-index-1">
        {title ?
            <h1 className="t-pdp-heading__title u-text-uppercase u-margin-bottom">{title}</h1>
        :
            <SkeletonBlock width="50%" height="32px" className="u-margin-bottom" />
        }

        {price ?
            <span className="t-pdp-heading__price t-pdp__price u-color-accent u-text-normal u-text-header-font-family u-text-letter-spacing">{price}</span>
        :
            <SkeletonBlock width="25%" height="32px" />
        }
    </div>
)

PDPHeading.propTypes = {
    price: PropTypes.string,
    title: PropTypes.string
}

const mapStateToProps = createStructuredSelector({
    title: selectors.getProductTitle,
    price: selectors.getProductPrice
})

export default connect(mapStateToProps)(PDPHeading)
