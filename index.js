const Assets = require('../../utils/Assets');
const Websocket = require('../../utils/Websocket');

const pluginSettings = require('./settings.json');

module.exports = [{
    types: ['message'],
    regex: /.+/,
    ignoreRateLimiting: true,
    action: function( chat, stanza ) {
        const flyouts = pluginSettings.flyouts;
        const lowerCaseMessage = stanza.message.toLowerCase();

        flyouts.forEach( (flyout) => {
            if ( lowerCaseMessage.indexOf( flyout.command.toLowerCase() ) >= 0 ) {
                Assets.load( flyout.image, function(base64Image) {
                	Websocket.sendMessage( chat.credentials.room, {
                		message: 'flyout',
                        type: 'image',
                		content: base64Image,
                        animation: flyout.animation
                	});
                });
            }
        } );

    }
}];
