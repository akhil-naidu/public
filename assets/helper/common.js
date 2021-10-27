function catchus(platform) {
    if(platform === 'twitter') {
        const url = `https://twitter.com/Edumatica_io` 
        window.open(url)
    } else if(platform === 'fb') {
        const url = `https://www.facebook.com/edumatica.io`
        window.open(url)
    } else if(platform === 'linkedin') {
        const url = `https://www.linkedin.com/company/edumatica-edu/`
        window.open(url)
    } else if(platform === 'ig') {
        const url = `https://www.instagram.com/edumatica.io/`
        window.open(url)
    } else if(platform === 'yt') {
        const url = `https://www.youtube.com/channel/UCfelp3dtxARx-nu6oIKAGVw`
        window.open(url)
    }
}

function redirectTC () {
    window.open(commonVars.REACT_APP_URL + '/terms-conditions');
}

function redirectPP () {
    window.open(commonVars.REACT_APP_URL + '/privacy-policy');
}

function redirectDC () {
  window.open(commonVars.REACT_APP_URL + '/web-disclaimer');
}

function redirectToLogin () {
    window.location.replace(commonVars.REACT_APP_URL + '/login');
}
