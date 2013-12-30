function Snowflake(container) {
	/* Start by creating a wrapper div, and an empty img element */
	this.flake = document.createElement('div');
	// this.image = document.createElement('div');
	this.image = document.createElement('img');

	this.setInteger();
	this.setClassNames();
	this.setFlakeStyles(container);
	this.setImageStyles();

	// add the <img> to the <div>
	this.flake.appendChild(this.image);

	this.flake.object = this;

	this.flake.addEventListener( 'click', this.explode, false );
}

Snowflake.prototype = {
	"integer": null,
	"low": 1,
	"high": 8,
	"height": 300,

	"setInteger": function setInteger() {
		this.integer = DC.randomInteger(this.low, this.high);
	},

	"setClassNames": function setClassNames() {
		/* Randomly choose a leaf image and assign it to the newly created element */
		this.flake.addClass('snowflake');
		// this.flake.addClass('flake' + this.integer);
		this.image.addClass('img');
		this.image.src = "images/snowflakes/"+ this.integer +"c.png";
	},

	"setFlakeStyles": function setFlakeStyles(container) {
		/* Determine the width of the container */
		var width = container.offsetWidth;

		this.flake.style.top = "-"+ this.height +"px";

		/* Position the leaf at a random location along the screen */
		this.flake.style.left = DC.pixelValue(DC.randomInteger(0, width));

		/* Set the -webkit-animation-name property with these values */
		this.flake.style.webkitAnimationName = 'fade, drop';

		/* Figure out a random duration for the fade and drop animations */
		var fadeAndDropDuration = DC.durationValue(DC.randomFloat(8, 14));

		/* Set the -webkit-animation-duration property with these values */
		this.flake.style.webkitAnimationDuration = fadeAndDropDuration + ', ' + fadeAndDropDuration;

		var leafDelay = DC.durationValue(DC.randomFloat(0, 5));
		this.flake.style.webkitAnimationDelay = leafDelay + ', ' + leafDelay;

		var top = DC.randomInteger(-2,Field.rowCount()) * Field.rowSize();
		this.flake.style.webkitTransformOriginZ =  top +"px";

	},

	"setImageStyles": function setImageStyles() {
		/* Randomly choose a spin animation */
		var spinAnimationName = (Math.random() < 0.5) ? 'clockwiseSpin' : 'counterclockwiseSpinAndFlip';
		this.image.style.webkitAnimationName = spinAnimationName;

		/* Figure out another random duration for the spin animation */
		var spinDuration = DC.durationValue(DC.randomFloat(4, 8));
		this.image.style.webkitAnimationDuration = spinDuration;
	},

	"explode": function explode(event) {
		console.log("== DC == CLICKED THE SNOWFLAKE == ");
	}
}
