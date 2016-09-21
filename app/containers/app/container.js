import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {hidePreloader} from 'progressive-web-sdk/dist/preloader'
import {IconSprite} from 'progressive-web-sdk/dist/components/icon'

// import * as appActions from './actions'

import {addLocaleData, FormattedDate, FormattedMessage, IntlProvider} from 'react-intl'
import en from 'react-intl/locale-data/en'
import ar from 'react-intl/locale-data/ar'

const dict = {
    'app.goodbye': 'Goodbye {name} :\'('
}

class App extends React.Component {

    componentWillMount() {
        addLocaleData([...en, ...ar])
    }

    componentDidMount() {
        hidePreloader()
        // Dispatch an action to retrieve global content here
    }

    render() {
        let currentTemplate = `t-${this.props.children.props.route.routeName}`

        return (
            <IntlProvider locale="ar" messages={dict}>
                <div id="outer-container" className="t-app">
                    <IconSprite />

                    <main id="page-wrap" className={currentTemplate}>
                        <header>
                            Date:
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
