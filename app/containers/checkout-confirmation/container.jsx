import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import Immutable from 'immutable'

import Link from 'progressive-web-sdk/dist/components/link'
import List from 'progressive-web-sdk/dist/components/list'
import ListTile from 'progressive-web-sdk/dist/components/list-tile'
import {Icon} from 'progressive-web-sdk/dist/components/icon'
import Field from 'progressive-web-sdk/dist/components/field'

import * as checkoutConfirmationActions from './actions'

const containerClass = 't-checkout-confirmation'

class CheckoutConfirmation extends React.Component {
    componentDidMount() {
        // this.props.fetchContents()
    }

    shouldComponentUpdate(newProps) {
        return !Immutable.is(this.props.checkoutConfirmation, newProps.checkoutConfirmation)
    }

    render() {
        const {
            contentsLoaded,
            emailAddress,
            orderNumber
        } = this.props.checkoutConfirmation.toJS()

        // TODO: If logged in or not

        return (
            contentsLoaded &&
                <div className={containerClass}>
                    <div className="u-padding-md">
                        <h1 className="u-heading-family u-text-uppercase u-padding-bottom-lg">
                            Thanks, <span className="u-text-lighter">Order Confirmed</span>
                        </h1>
                        <p className="u-padding-bottom-md">
                            An email confirmation has been sent to <span className="u-text-bold">{emailAddress}</span>, along with your order receipt.
                        </p>
                        <p>
                            Your order # is: <span className="u-text-bold">{orderNumber}</span>.
                        </p>
                    </div>
                    <div className="u-bg-color-neutral-20">
                        <h3 className="u-heading-family u-text-uppercase u-padding-md u-padding-top-lg u-padding-bottom-lg">
                            Save your details for next time
                        </h3>
                    </div>
                    <div className="u-padding-md">
                        <List>
                            <ListTile
                                className="t-checkout-confirmation__point-list"
                                startAction={<Icon name="check" size="medium" />}
                            >
                                <div>Check out faster with saved address and payment information</div>
                            </ListTile>
                            <ListTile
                                className="t-checkout-confirmation__point-list"
                                startAction={<Icon name="check" size="medium" />}
                            >
                                <div>Track order progress online</div>
                            </ListTile>
                            <ListTile
                                className="t-checkout-confirmation__point-list"
                                startAction={<Icon name="check" size="medium" />}
                            >
                                <div>Access order history</div>
                            </ListTile>
                        </List>
                    </div>

                    <form className="u-padding-md">
                        <Field
                            label="Choose a password"
                            idForLabel="password"
                            hint="More than 5 characters with at least one number" >

                            <input type="password" name="password" required />

                        </Field>
                        <Field
                            label="Re-enter password"
                            idForLabel="password2" >

                            <input type="password" name="password2" required />

                        </Field>
                    </form>

                    <div className="u-bg-color-neutral-20">
                        <h3 className="u-heading-family u-text-uppercase u-padding-md u-padding-top-lg u-padding-bottom-lg">
                            Any questions?
                        </h3>
                    </div>

                    Orders and Returns

                    Contact us

                    Continue Shopping
                    <div>
                        <Link href="/checkout/shipping/" className="u-text-small">To Shipping</Link>
                    </div>
                    <div>
                        <Link href="/" className="u-text-small">Home</Link>
                    </div>
                </div>
        )
    }
}

CheckoutConfirmation.propTypes = {
    checkoutConfirmation: PropTypes.instanceOf(Immutable.Map),
    fetchContents: PropTypes.func
}

const mapStateToProps = (state) => {
    return {
        checkoutConfirmation: state.checkoutConfirmation
    }
}

const mapDispatchToProps = {
    fetchContents: checkoutConfirmationActions.fetchContents
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckoutConfirmation)
