module.exports = {
	name: 'flyouts',
	dependencies: [{
		name: 'jquery'
	}, {
		name: 'velocity',
		url: '//cdn.jsdelivr.net/velocity/1.2.3/velocity.min.js'
	}],
	html: '<img src="" id="flyout" style="display: block; bottom: -100%; top: auto; position: absolute;" />',
	func: function( socket, username ) {
		registerSocketMessage( 'showImage', function( messageObj ) {
			if ( messageObj.message === 'showImage' ) {
				var $img = $('img#flyout');
				$img.attr('src', 'data:image/png;base64,' + messageObj.image);
				$img.velocity( {
					bottom: '0'
				} );
				$img.velocity( {
					bottom: '-100%'
				}, {
					delay: 5000
				} );
			}
		} );
	}
};
