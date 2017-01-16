
import WebViewPlugin from 'astro/plugins/webViewPlugin'
import onboardingConfig from './onboardingConfig'

const OnboardingController = function(navigationView) {
    this.viewPlugin = navigationView
}

OnboardingController.init = async function() {
    const webView = await WebViewPlugin.init()

    // Disable webview loader when first loading onboarding page
    webView.disableLoader()
    webView.disableScrolling()

    const onboardingController = new OnboardingController(webView)
    onboardingController.navigate(onboardingConfig.url)

    return onboardingController
}

OnboardingController.prototype.navigate = function(url) {
    if (!url) {
        return
    }

    this.viewPlugin.navigate(url)
}

OnboardingController.prototype.back = function() {
    this.viewPlugin.back()
}

OnboardingController.prototype.canGoBack = function() {
    return this.viewPlugin.canGoBack()
}

export default OnboardingController
