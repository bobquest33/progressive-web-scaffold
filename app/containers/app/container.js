import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'

// import * as appActions from './actions'

import {addLocaleData, FormattedDate, FormattedMessage, IntlProvider} from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'

const messages = {
    'en-US': {
        'app.goodbye': 'Goodbye {name} :\'('
    },
    'fr': {
        'app.goodbye': 'Au Revoir {name} :\'('
    }
}

class App extends React.Component {

    constructor() {
        super()

        this.state = {
            locale: navigator.language
        }

        this.changeLocale = this.changeLocale.bind(this)
    }

    componentWillMount() {
        addLocaleData([...en, ...fr])
    }

    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    changeLocale(event) {
        this.setState({
            locale: event.target.value
        })
    }

    render() {
        let currentTemplate = `t-${this.props.children.props.route.routeName}`

        return (
            <IntlProvider locale={this.state.locale} messages={messages[this.state.locale]}>
                <div id="outer-container" className="t-app">
                    <IconSprite />

                    <main id="page-wrap" className={currentTemplate}>
                        <header>
                            <strong>Date: </strong>
                            <FormattedDate
                                value={new Date()}
                                year='numeric'
                                month='long'
                                day='numeric'
                                weekday='long'
                            />
                        </header>

                        <FormattedMessage
                            id="app.goodbye"
                            values={{name: 'mike'}}
                            />

                        <div>
                            <label>Language:</label>
                            <select onChange={this.changeLocale} defaultValue={this.state.locale}>
                                <option value="en-US">English</option>
                                <option value="fr">French</option>
                            </select>
                        </div>

                        <div id="content">
                            {this.props.children}
                        </div>

                        <footer>
                            Footer content
                        </footer>
                    </main>
                </div>
            </IntlProvider>
        )
    }
}

App.propTypes = {
    children: PropTypes.element.isRequired
}

const mapStateToProps = (state) => {
    return {
        ...state.app,
    }
}

const mapDispatchToProps = () => {
    return {
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
