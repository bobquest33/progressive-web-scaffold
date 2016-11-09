import {createAction, makeFormEncodedRequest} from '../../utils/utils'
import {SubmissionError} from 'redux-form'

const validateForm = (formValues) => {
    const errors = {
        login: {}
    }
    if (!formValues.login) {
        return {
            _error: 'Please fill in the form'
        }
    }
    const email = formValues.login.username
    if (!email) {
        errors.login.username = 'Email address is required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        errors.login.username = 'Email address is invalid'
    }
    const password = formValues.login.password
    if (!password) {
        errors.login.password = 'Password is required'
    }
    return errors
}

export const submitForm = (formValues, resolve, reject) => {
    return (dispatch, getStore) => {
        const errors = validateForm(formValues)
        if (errors._error || Object.keys(errors.login).length) {
            return reject(new SubmissionError(errors))
        }
        const loginPage = getStore().login.toJS()
        const {href, hiddenInputs} = loginPage.form

        hiddenInputs.forEach((input) => {
            formValues[input.name] = input.value
        })

        return makeFormEncodedRequest(href, formValues, {method: 'POST'})
            .then((response) => {
                return response.text()
            })
            .then((responseText) => {
                const $html = $(responseText)
                if ($html.find('.form-login').length) {
                    const error = {
                        _error: 'Username or password is incorrect'
                    }
                    reject(new SubmissionError(error))
                } else {
                    window.location.href = '/customer/account'
                    resolve(true)
                }
            })
            .catch((error) => {
                console.error('Failed to login due to network error.', error)
                reject({})
            })
    }
}

export const openInfoModal = createAction('Close Info Sheet')
export const closeInfoModal = createAction('Close Info Sheet')
