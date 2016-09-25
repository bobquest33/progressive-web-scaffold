// Our tests require our specific Promise polyfill to run properly
global.Promise = require.requireActual('es6-promise')
// Parser tests need to be supplied a selector library
import $ from '../app/static/js/jquery.min.js'
global.$ = $
// Prevents a console.error when using asset-utils/getAssetUrl in tests
global.document.head.innerHTML = '<head><script src="https://localhost:8443/loader.js"></script></head>'
