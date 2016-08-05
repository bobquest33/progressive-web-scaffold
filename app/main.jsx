import {polyfill} from 'es6-promise'

// React
import {render} from 'react-dom'
import {Router, Route, IndexRoute, browserHistory, applyRouterMiddleware} from 'react-router'
import useScroll from 'react-router-scroll'

// Redux
import {Provider} from 'react-redux'
import configureStore from './store'

// Containers
import App from './containers/app/container'
import Home from './containers/home/container'
import PLP from './containers/plp/container'

// Themr
import { ThemeProvider } from 'react-css-themr'
const contextTheme = {
  PWButton: require('./components/button/button.scss'),
  PWBreadcrumbs: require('./components/breadcrumbs/breadcrumbs.scss')
}
import Button from 'progressive-web-sdk/dist/components/button' // for demo
import Breadcrumbs from 'progressive-web-sdk/dist/components/breadcrumbs/breadcrumbs.js' // for demo

// Stylesheet: importing it here compiles the SCSS into CSS. The CSS is actually
// added to the markup in `loader.js`
import Stylesheet from './stylesheet.scss' // eslint-disable-line no-unused-vars

polyfill()

const store = configureStore()

render(
    <ThemeProvider theme={contextTheme}>
        <div>
            <Button>Test 1</Button> // for demo
            <Breadcrumbs items={[
        		{text: 'Home',href: 'http://www.mobify.com'},
                {text: 'Cat',href: 'http://www.mobify.com'},
                {text: 'Food'}
        	]} />
            <Provider store={store}>
                <Router history={browserHistory}
                    render={applyRouterMiddleware(useScroll())}
                >
                    <Route path="/" component={App}>
                        <IndexRoute component={Home} routeName="home" />
                        <Route component={PLP} path="potions.html" routeName="productListPage" />
                    </Route>
                </Router>
            </Provider>
        </div>
    </ThemeProvider>,
    document.getElementsByClassName('react-target')[0]
)
