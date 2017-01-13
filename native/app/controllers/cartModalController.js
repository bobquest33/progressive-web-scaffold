import Promise from 'bluebird'

import AnchoredLayoutPlugin from 'progressive-app-sdk/plugins/anchoredLayoutPlugin'
import ModalViewPlugin from 'progressive-app-sdk/plugins/modalViewPlugin'
import NavigationPlugin from 'progressive-app-sdk/plugins/navigationPlugin'

import CartHeaderController from './cartHeaderController'
import CartConfig from '../config/cartConfig'

const CartModalController = function(modalView, navigationView) {
    this.isShowing = false
    this.viewPlugin = modalView
    this.navigationView = navigationView
}

CartModalController.init = async function() {
    const [
        modalView,
        anchoredLayout,
        navigationView,
        cartHeaderController,
    ] = await Promise.all([
        ModalViewPlugin.init(),
        AnchoredLayoutPlugin.init(),
        NavigationPlugin.init(),
        CartHeaderController.init(),
    ])

    await anchoredLayout.addTopView(cartHeaderController.viewPlugin)
    await anchoredLayout.setContentView(navigationView)
    await navigationView.navigateToUrl(CartConfig.url, {}, {})
    await navigationView.setHeaderBar(cartHeaderController.viewPlugin)

    await modalView.setContentView(anchoredLayout)                // load the view in to the modal

    const cartModalController = new CartModalController(modalView, navigationView)

    cartHeaderController.registerCloseEvents(() => {
        cartModalController.hide()
    })

    cartHeaderController.viewPlugin.on('click:back', () => {
        navigationView.back()
    })

    const headerBarData = {
        header: {
            rightIcon: {
                id: 'close',
                imageUrl: 'file:///close.png'
            }
        }
    }

    navigationView.disableDefaultNavigationHandler()
    navigationView.on('navigate', (params) => {
        console.log('TAGTAG')
        navigationView.navigateToUrl(params.url, headerBarData, {})
    })

    return cartModalController
}

CartModalController.prototype.show = async function() {
    if (this.isShowing) {
        return
    }
    this.isShowing = true
    this.viewPlugin.show({animated: true})
}

CartModalController.prototype.hide = async function() {
    await this.viewPlugin.hide({animated: true})
    this.isShowing = false
}

CartModalController.prototype.isActiveItem = function() {
    return this.isShowing
}

export default CartModalController
