import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'
import SkipLinks from '../../components/skip-links'

import * as appActions from './actions'

import {addLocaleData, FormattedDate, FormattedMessage, IntlProvider} from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

class App extends React.Component {
    componentWillMount() {
        addLocaleData([...en, ...fr])
    }

    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    render() {
        const currentTemplate = `t-${this.props.children.props.route.routeName}`
        const {
            locale,
            messages,
            setLocale
        } = this.props

        return (
            <IntlProvider defaltLocale="en-US" locale={locale} messages={messages}>
                <div id="app" className="t-app">
                    <IconSprite />
                    <SkipLinks />

                    <div id="app-wrap" className={currentTemplate}>
                        <header id="app-header" role="banner">
                            <strong>Date: </strong>
                            <FormattedDate
                                value={new Date()}
                                year="numeric"
                                month="long"
                                day="numeric"
                                weekday="long"
                            />

                            <button id="app-navigation">Menu</button>

                            <FormattedMessage
                                id="app.goodbye"
                                values={{name: 'mike'}}
                            />

                            <div>
                                <label htmlFor="locale-select">Language:</label>
                                <select id="locale-select" onBlur={setLocale} onChange={setLocale} defaultValue={locale}>
                                    <option value="en-US">English</option>
                                    <option value="fr">French</option>
                                </select>
                            </div>
                        </header>

                        <main id="app-main" role="main">
                            {this.props.children}
                        </main>

                        <footer id="app-footer" role="contentinfo">
                            Footer content
                        </footer>
                    </div>
                </div>
            </IntlProvider>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired,
    locale: PropTypes.string.isRequired,
    messages: PropTypes.object.isRequired,
    setLocale: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.app.toJS(),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setLocale: (e) => dispatch(appActions.setLocale(e.target.value))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
