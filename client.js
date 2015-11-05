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

		registerSocketMessage( 'flyout', function( messageObj ) {
			var $div = $('div#flyout');
            var duration = messageObj.duration || 5000;

            if ( messageObj.type === 'image' ) {
                var $content = $( '<img />', {
                    src: 'data:image/png;base64,' + messageObj.content
                });
            } else if ( messageObj.type === 'div' ) {
                var $content = $( messageObj.content );
            }
            $div.html( $content );

            switch( messageObj.animation ) {
                case 'fade':
                    fade( $div, duration );
                    break;
                case 'scale':
                    scale( $div, duration );
                    break;
                case 'fly-bottom':
                    flyBottom( $div, duration );
                    break;
                case 'fly-left':
                    flyLeft( $div, duration );
                    break;
                case 'fly-top':
                    flyTop( $div, duration );
                    break;
                case 'fly-right':
                    flyRight( $div, duration );
                    break;
                default:
                    // If the animation doesn't exist,
                    // don't show the image.
                    $div.css({
                        left: 'auto',
                        right: 'auto',
                        top: 'auto',
                        bottom: 'auto',
                        opacity: 0
                    });
                    break;
            }
		} );

        /**
         * Fades the image in
         * @param  {jQuery object} $div
         * @return {void}
         */
        function fade( $div, duration ) {
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
                delay: duration
            } );
        }

        /**
         * Scales the image from 0% to 100%
         * @param  {jQuery object} $div
         * @return {void}
         */
        function scale( $div, duration ) {
            $div.css({
                left: 50,
                right: 'auto',
                top: 'auto',
                bottom: 50,
                opacity: 1
            });
            $div.velocity({
                scale: 0
            }, {
                duration: 1
            }).velocity( {
                scale: 1,
            } );

            $div.velocity( {
                scale: 0
            }, {
                delay: duration
            } ).velocity({
                scale: 1,
                opacity: 0
            }, {
                duration: 1
            });
        }

        /**
         * Fly in the image from the left
         * @param  {jQuery object} $div
         * @return {void}
         */
        function flyLeft( $div, duration ) {
            $div.css({
                left: '-150%',
                right: 'auto',
                top: 'auto',
                bottom: 50,
                opacity: 1
            });
            $div.velocity( {
                left: 50
            } );
            $div.velocity( "reverse", {
                delay: duration
            } );
        }

        /**
         * Fly in the image from the right
         * @param  {jQuery object} $div
         * @return {void}
         */
        function flyRight( $div, duration ) {
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
                delay: duration
            } );
        }

        /**
         * Fly in the image from the top
         * @param  {jQuery object} $div
         * @return {void}
         */
        function flyTop( $div, duration ) {
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
                delay: duration
            } );
        }

        /**
         * Fly in from the bottom
         * @param  {jQuery Object} $div
         * @return {void}
         */
        function flyBottom( $div, duration ) {
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
                delay: duration
            } );
        }
	}
};
