import React, {PropTypes} from 'react'
import classNames from 'classnames'
import clippy from './clippy'
const componentClass = 'c-clippy'
import ChatWindow from '../chat-window'

/**
 * Your annoying assistant
 */

class Clippy extends React.Component {
    componentDidMount() {
        clippy.load('Clippy', `.${componentClass}__agent`, (agent) => {
            // Do anything with the loaded agent
            agent.show()
            const timeout = () => {
                setTimeout(() => {
                    agent.animate()
                    timeout()
                }, 2000)
            }

            timeout()
        })
    }
    render() {
        const {
            className,
            messages,
            sendMessageToClippy
        } = this.props

        const classes = classNames(componentClass, className)

        return (
            <div className={classes}>
                <div className="u-flexbox">
                    <div className={`${componentClass}__card u-padding-md`}>
                        <div className={`${componentClass}__message`}>
                            Clippy's most recent message will go here
                        </div>
                    </div>
                    <div className={`${componentClass}__agent`} />
                </div>

                <ChatWindow messages={messages} sendMessageToClippy={sendMessageToClippy} />
            </div>
        )
    }
}


Clippy.propTypes = {
    /**
     * Adds values to the `class` attribute of the root element
     */
    className: PropTypes.string,

    messages: PropTypes.array,

    sendMessageToClippy: PropTypes.func
}

export default Clippy