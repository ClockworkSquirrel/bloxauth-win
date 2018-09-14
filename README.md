# bloxauth-win
Authenticate Roblox users via the Windows registry cookie. No user-input required.
User must be logged in to Roblox Studio in order to authenticate.

## Example Usage
### Login
```javascript
const bloxauth = require('bloxauth-win');

bloxauth.getCurrentUser().then(currentUser => {
  console.log(`Logged in as ${currentUser.UserName}`);
});
```

### Get Cookie
```javascript
bloxauth.getCookie().then(cookie => {
  console.log(`[Cookie] .ROBLOSECURITY=${cookie}`);
});
```

See [example.js](example.js) for more.
