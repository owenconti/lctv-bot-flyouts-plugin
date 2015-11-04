module.exports = {
	name: 'flyouts',
	dependencies: [{
		name: 'jquery'
	}, {
		name: 'velocity',
		url: '//cdn.jsdelivr.net/velocity/1.2.3/velocity.min.js'
	}],
	html: '<img src="" id="flyout" style="display: block; position: absolute;" />',
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
			var $img = $('img#flyout');
			$img.attr('src', 'data:image/png;base64,' + messageObj.image);

            switch( messageObj.animation ) {
                case 'fade':
                    fade( $img );
                    break;
                case 'scale':
                    scale( $img );
                    break;
                case 'fly-bottom':
                    flyBottom( $img );
                    break;
                case 'fly-left':
                    flyLeft( $img );
                    break;
                case 'fly-top':
                    flyTop( $img );
                    break;
                case 'fly-right':
                    flyRight( $img );
                    break;
            }
		} );

        function fade( $img ) {
            $img.css({
                left: 'auto',
                right: 'auto',
                top: 'auto',
                bottom: 'auto',
                opacity: 0
            });
            $img.velocity( {
                opacity: 1
            } );
            $img.velocity( "reverse", {
                delay: 5000
            } );
        }

        function scale( $img ) {
            $img.css({
                left: 'auto',
                right: 'auto',
                top: 'auto',
                bottom: 'auto',
                opacity: 1
            });
            $img.velocity({
                scale: 0
            }, {
                duration: 1
            }).velocity( {
                scale: 1,
            } );

            $img.velocity( {
                scale: 0
            }, {
                delay: 5000
            } ).velocity({
                scale: 1,
                opacity: 0
            }, {
                duration: 1
            });
        }

        function flyLeft( $img ) {
            $img.css({
                left: '-100%',
                right: 'auto',
                top: 'auto',
                bottom: 'auto',
                opacity: 1
            });
            $img.velocity( {
                left: '0'
            } );
            $img.velocity( "reverse", {
                delay: 5000
            } );
        }

        function flyRight( $img ) {
            $img.css({
                right: '-100%',
                bottom: 'auto',
                top: 'auto',
                left: 'auto',
                opacity: 1
            });
            $img.velocity( {
                right: '0'
            } );
            $img.velocity( "reverse", {
                delay: 5000
            } );
        }

        function flyTop( $img ) {
            $img.css({
                top: '-100%',
                right: 'auto',
                bottom: 'auto',
                left: 'auto',
                opacity: 1
            });
            $img.velocity( {
                top: '0'
            } );
            $img.velocity( "reverse", {
                delay: 5000
            } );
        }

        /**
         * Fly in from the bottom
         * @param  {jQuery Object} $img
         * @return {void}
         */
        function flyBottom( $img ) {
            $img.css({
                bottom: '-100%',
                right: 'auto',
                top: 'auto',
                left: 'auto',
                opacity: 1
            });
            $img.velocity( {
                bottom: '0'
            } );
            $img.velocity( "reverse", {
                delay: 5000
            } );
        }
	}
};
