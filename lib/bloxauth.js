const { Registry } = require('rage-edit'),
      request = require('request-promise'),
      RobloxReg = new Registry('HKCU\\\Software\\Roblox\\RobloxStudioBrowser\\roblox.com')

exports.getCookie = () => {
    return RobloxReg.get('.ROBLOSECURITY').then(entry => {
        let data = {};
        
        entry.split(',').map(dataset => {
            let pairs = dataset.split('::');
            data[pairs[0].toLowerCase()] = pairs[1].substr(1, pairs[1].length - 2);
        });

        if (data.cook == undefined && data.exp == undefined) {
            throw 'Couldn\'t get login cookie';
        } else {
            if (new Date(data.exp).getTime() - Date.now() <= 0) {
                throw 'Login cookie has expired';
            }
        }

        return data.cook;
    });
}

exports.request = options => exports.getCookie().then(cookie => {
    options = typeof(options) == 'object' ? options : {};
    options = Object.assign({ method: 'GET', json: true }, options);

    if (typeof(options.headers) != 'object') options.headers = {};
    options.headers.Cookie = `.ROBLOSECURITY=${cookie}`;

    return request(options);
});

exports.getCurrentUser = () => exports.getCookie().then(cookie => {
    cookie = `.ROBLOSECURITY=${cookie}`;

    return exports.request({
        uri: 'https://www.roblox.com/mobileapi/userinfo',
        followRedirect: false
    });
});
