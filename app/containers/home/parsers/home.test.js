import {jquerifyHtmlFile} from 'progressive-web-sdk/dist/test-utils'
import homeParser from './home'

test('the title is parsed', () => {
    const home = homeParser(window.$, jquerifyHtmlFile('./home.test.html'))
    // t.truthy(home)
    // t.truthy(home.title)
    expect(home.title).toEqual('Home page')
})
