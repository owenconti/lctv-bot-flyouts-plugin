module.exports = {
	name: 'flyouts',
	dependencies: [{
		name: 'jquery'
	}, {
		name: 'velocity',
		url: '//cdn.jsdelivr.net/velocity/1.2.3/velocity.min.js'
	}],
	html: '<div id="flyout" style="display: block; position: absolute;" />',
	func: function( socket, username ) {
        // Container CSS for the flyouts image tag
        var $flyoutDiv = $('#flyouts');
        $flyoutDiv.css({
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '700px',
            height: '700px'
        });

        var animationQueue = [];
        var animationInProgress = false;

		registerSocketMessage( 'flyout', function( messageObj ) {
            // Check if the request animation is valid
            var requestedAnimation = animations[ messageObj.animation ];
            if ( !requestedAnimation ) {
                // If the animation doesn't exist,
                // don't show the image.
                 $('div#flyout').css({
                    left: 'auto',
                    right: 'auto',
                    top: 'auto',
                    bottom: 'auto',
                    opacity: 0
                });

                console.log( 'Invalid animation request: ' + messageObj.animation );
                return;
            }

            // Add the animation to the queue and run the queue
            animationQueue.push( {
                messageObj: messageObj,
                animationFunction: requestedAnimation
            } );
            runAnimationQueue();

            /**
             * Runs the animation queue.
             * Starts animating the first function in the queue.
             * Removes the animated function from the queue once ran.
             * @return {void}
             */
            function runAnimationQueue() {
                if ( animationQueue.length === 0 ) {
                    return;
                }

                // If no animation is running,
                // run the first in the queue
                if ( !animationInProgress ) {
                    var animationObj = animationQueue.shift();
                    var messageObj = animationObj.messageObj;
                    var animationFunction = animationObj.animationFunction;
                    var duration = messageObj.duration || 5000;

                    // Build the div to flyout
                    var $div = $('div#flyout');
                    var $content = null;
                    if ( messageObj.type === 'image' ) {
                        $content = $( '<img />', {
                            src: 'data:image/png;base64,' + messageObj.content,
                            style: 'max-width: 100%;'
                        });
                    } else if ( messageObj.type === 'div' ) {
                        $content = $( messageObj.content );
                    }
                    $div.html( $content );

                    // Run the animation
                    animationInProgress = true;
                    animationFunction( $div, duration, handleAnimationComplete );
                }
            }

            /**
             * Handles when an animation finishes.
             * @return {void}
             */
            function handleAnimationComplete() {
                animationInProgress = false;
                runAnimationQueue();
            }
		} );

        /**
         * Available animations.
         * @type {Object}
         */
        var animations = {
            /**
             * Fades the image in
             */
            fade: function( $div, duration, callback ) {
                $div.css({
                    left: 50,
                    right: 'auto',
                    top: 'auto',
                    bottom: 50,
                    opacity: 0
                });
                $div.velocity( {
                    opacity: 1
                } );
                $div.velocity( "reverse", {
                    delay: duration,
                    complete: callback
                } );
            },

            /**
             * Scales the image from 0% to 100%
             */
            scale: function( $div, duration, callback ) {
                $div.css({
                    left: 50,
                    right: 'auto',
                    top: 'auto',
                    bottom: 50,
                    opacity: 0
                });
                $div.velocity({
                    scale: 0,
                    opacity: 1
                }, {
                    duration: 1
                }).velocity( {
                    scale: 1,
                } );

                $div.velocity( {
                    scale: 0
                }, {
                    delay: duration
                }).velocity({
                    scale: 1,
                    opacity: 0
                }, {
                    duration: 1,
                    complete: callback
                });
            },

            /**
             * Fly in the image from the left
             */
            flyLeft: function( $div, duration, callback ) {
                $div.css({
                    left: '-150%',
                    right: 'auto',
                    top: 'auto',
                    bottom: 50,
                    opacity: 1
                });
                $div.velocity( {
                    left: '50px'
                } );
                $div.velocity( "reverse", {
                    delay: duration,
                    complete: callback
                } );
            },

            /**
             * Fly in the image from the right
             */
            flyRight: function( $div, duration, callback ) {
                $div.css({
                    right: '-100%',
                    bottom: 50,
                    top: 'auto',
                    left: 'auto',
                    opacity: 1
                });
                $div.velocity( {
                    right: 50
                } );
                $div.velocity( "reverse", {
                    delay: duration,
                    complete: callback
                } );
            },

            /**
             * Fly in the image from the top
             */
            flyTop: function( $div, duration, callback ) {
                $div.css({
                    top: '-100%',
                    right: 'auto',
                    bottom: 'auto',
                    left: 50,
                    opacity: 1
                });
                $div.velocity( {
                    top: '0'
                } );
                $div.velocity( "reverse", {
                    delay: duration,
                    complete: callback
                } );
            },

            /**
             * Fly in from the bottom
             */
            flyBottom: function( $div, duration, callback ) {
                $div.css({
                    bottom: '-150%',
                    right: 'auto',
                    top: 'auto',
                    left: 50,
                    opacity: 1
                });
                $div.velocity( {
                    bottom: 50
                } );
                $div.velocity( "reverse", {
                    delay: duration,
                    complete: callback
                } );
            }
        };
	}
};
