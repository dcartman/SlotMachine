Element.prototype.addClass = function(cls) {
	var current = this.className.split(' ');
	if( current.indexOf(cls) == -1 ) {
		current.push( cls );
	}
	this.className = current.join(' ').trim();
	return this;
}

Element.prototype.removeClass = function(cls) {
	var current = this.className.split(' ');
	if( current.indexOf(cls) > -1 ) {
		current.splice( current.indexOf(cls), 1 );
	}
	this.className = current.join(' ').trim();
	return this;
}

Element.prototype.toggleClass = function(cls) {
	var current = this.className.split(' ');
	if( current.indexOf(cls) > -1 ) {
		current.splice( current.indexOf(cls), 1 );
	} else {
		current.push( cls );
	}
	this.className = current.join(' ').trim();
	return this;
}

Array.prototype.openpositions = function() {
	var open = Array(),
		length = this.length;

	for (var i = 0; i < length; i++) {
		if (this[i] === undefined) open.push(i);
	}
	return open;
}

DC = {

	/**
	 *   Receives the lowest and highest values of a range and
	 *   returns a random integer that falls within that range.
	 **/
	"randomInteger": function randomInteger(low, high) {
		return low + Math.floor(Math.random() * (high - low));
	},

	/**
	 *  Receives the lowest and highest values of a range and
	 *  returns a random float that falls within that range.
	 **/
	"randomFloat": function randomFloat(low, high) {
		return low + Math.random() * (high - low);
	},

	/**
	 *   Receives a number and returns its CSS pixel value.
	 **/
	"pixelValue": function pixelValue(value) {
		return value + 'px';
	},


	/**
	 *   Returns a duration value for the falling animation.
	 **/

	"durationValue": function durationValue(value) {
		return value + 's';
	}
}