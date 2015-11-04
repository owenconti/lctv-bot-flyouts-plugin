const Assets = require('../../utils/Assets');
const Websocket = require('../../utils/Websocket');

const pluginSettings = require('./settings.json');

module.exports = [{
    types: ['message'],
    regex: /.+/,
    ignoreRateLimiting: true,
    action: function( chat, stanza ) {
        const flyouts = pluginSettings.flyouts;

        flyouts.forEach( (flyout) => {
            if ( stanza.message.indexOf( flyout.command ) >= 0 ) {
                Assets.load( flyout.image, function(base64Image) {
                	Websocket.sendMessage( chat.credentials.room, {
                		message: 'flyout',
                		image: base64Image,
                        animation: flyout.animation
                	});
                });
            }
        } );

    }
}];
