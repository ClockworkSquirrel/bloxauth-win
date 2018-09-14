const bloxauth = require('./lib/bloxauth');

bloxauth.getCurrentUser().then(currentUser => {
    console.log(`Authenticated as ${currentUser.UserName}`);

    return bloxauth.request({
        uri: `https://friends.roblox.com/v1/users/${currentUser.UserID}/friends`
    }).then(friends => {
        return { currentUser: currentUser, friends: friends }
    });
}).then(friends => {
    return bloxauth.request({
        uri: 'https://friends.roblox.com/v1/my/friendsonline'
    }).then(friendsOnline => {
        console.log(`You have ${friends.friends.data.length} friends | ${friendsOnline.friendPresences.length} online`);
    });
}).then(() => {
    return bloxauth.request({
        uri: 'https://accountsettings.roblox.com/v2/twostepverification'
    });
}).then(twoStep => {
    console.log(`\nTwo-step verification is turned ${twoStep.enabled ? 'on' : 'off'}`);

    return bloxauth.request({
        uri: 'https://accountsettings.roblox.com/v1/email'
    });
}).then(email => {
    console.log(`Email: ${email.emailAddress} | ${email.verified ? 'Verified' : 'Not verified'}`);
}).catch(err => {
    console.error(err);
});