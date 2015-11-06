'use strict';

const Assets = require('../../utils/Assets');
const Websocket = require('../../utils/Websocket');
const pluginSettings = require('./settings.json');

/**
 * Sends the object to the websocket connection.
 * @param  {string} base64Image
 * @param  {object} flyout
 * @param  {Client} chat
 * @return {void}
 */
function sendContentToWebsocket( base64Image, flyout, chat ) {
    Websocket.sendMessage( chat.credentials.room, {
        message: 'flyout',
        type: 'image',
        content: base64Image,
        animation: flyout.animation,
        duration: flyout.duration
    });
}

module.exports = [{
    types: ['message'],
    regex: /.+/,
    ignoreRateLimiting: true,
    action: function( chat, stanza ) {
        const flyouts = pluginSettings.flyouts;
        const lowerCaseMessage = stanza.message.toLowerCase();

        flyouts.forEach( (flyout) => {
            // Convert any flyout command strings to arrays
            let flyoutCommands = flyout.command;
            if ( typeof flyoutCommands === 'string' ) {
                flyoutCommands = [ flyoutCommands ];
            }

            // Look for a match in the message
            let match = false;
            flyoutCommands.forEach( ( commandString ) => {
                if ( lowerCaseMessage.indexOf( commandString.toLowerCase() ) >= 0 ) {
                    match = true;
                }
            } );

            // If the message contained a flyout command,
            // send the flyout over the websocket
            if ( match ) {
                if ( flyout.image ) {
                    // If the flyout is for a local image
                    Assets.load( flyout.image, function(base64Image) {
                    	sendContentToWebsocket( base64Image, flyout, chat );
                    });
                } else if ( flyout.url ) {
                    // If the flyout is a url
                    Assets.loadUrl( flyout.url, function(base64Image) {
                        sendContentToWebsocket( base64Image, flyout, chat );
                    });
                }
            }
        } );
    }
}];
