import React, {PropTypes} from 'react'
import {Router, Route, IndexRoute} from 'progressive-web-sdk/dist/routing'
import {triggerMobifyPageView} from 'progressive-web-sdk/dist/analytics'
import {Provider} from 'react-redux'
import * as appActions from './containers/app/actions'
import {getComponentName} from './utils/utils'
import blacklist from './config/route-blacklist'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import Login from './containers/login/container'
import PLP from './containers/plp/container'
import PDP from './containers/pdp/container'


const AppProvider = ({store}) => {
    /**
     * Given the current router state, get the corresponding URL on the
     * desktop site. Ignores #fragments in the router state.
     */
    const getURL = (routerState) => {
        return [
            window.location.protocol,
            '//',
            window.location.host,
            routerState.location.pathname,
            routerState.location.search
        ].join('')
    }

    const getPageType = (routerState) => getComponentName(routerState.routes[1].component)

    const getRouteName = (routerState) => routerState.routes[1].routeName

    const dispatchRouteChanged = (nextState) => store.dispatch(appActions.onRouteChanged(getURL(nextState), getPageType(nextState)))

    const dispatchFetchPage = (nextState) => store.dispatch(appActions.fetchPage(getURL(nextState), getPageType(nextState), getRouteName(nextState)))

    const onEnter = (nextState) => {
        triggerMobifyPageView(nextState.routes[1].routeName)
        dispatchRouteChanged(nextState)
        dispatchFetchPage(nextState)
    }

    const onChange = (prevState, nextState) => {
        const prevURL = getURL(prevState)
        const nextURL = getURL(nextState)

        if (nextURL !== prevURL) {
            dispatchRouteChanged(nextState)
            dispatchFetchPage(nextState)
        }
    }

    return (
        <Provider store={store}>
            <Router blacklist={blacklist.routes}>
                <Route path="/" component={App} onEnter={onEnter} onChange={onChange}>
                    <IndexRoute component={Home} routeName="home" />
                    <Route component={Login} path="customer/account/login/" routeName="signin" />
                    <Route component={Login} path="customer/account/create/" routeName="register" />
                    <Route component={PLP} path="potions.html" routeName="productListPage" />
                    <Route component={PLP} path="books.html" routeName="productListPage" />
                    <Route component={PLP} path="ingredients.html" routeName="productListPage" />
                    <Route component={PLP} path="supplies.html" routeName="productListPage" />
                    <Route component={PLP} path="new-arrivals.html" routeName="productListPage" />
                    <Route component={PDP} path="*.html" routeName="productDetailsPage" />
                </Route>
            </Router>
        </Provider>
    )
}

AppProvider.propTypes = {
    store: PropTypes.object
}

export default AppProvider
