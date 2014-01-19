function SnowMound(container) {
	this.mound = document.createElement('div');
	this.mound.addClass('snowmound');

	var width = DC.randomInteger( 5, 25);
		height = DC.randomFloat( 2, 8);
		
	this.mound.style.width = width +"%";
	this.mound.style.height = height +"%";
	this.mound.style.transform = "translateZ("+ +")";
}

SnowMound.prototype = Object.create(FieldItem.prototype);

Object.extend(SnowMound, {

});