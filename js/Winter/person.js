function Person(obj) {

	for(var p in obj) {
		if( obj.hasOwnProperty(p) ) {
			this[p] = obj[p];
		}
	}

	// create basic element
	this.ele = document.createElement('div');
	this.ele.addClass("person");
	this.ele.addClass(this.cls);
	this.ele.object = this;

	var hat;
	if(this.hat || this.hair) {
		hat = document.createElement('div');
		hat.addClass(this.hat.type);
		hat.addClass(this.hat.color);
		this.ele.appendChild(hat);
	}

	var head = document.createElement('div');
	head.addClass('head');
	head.addClass(this.face.skinColor);

	var leftEye = document.createElement('div');
	leftEye.addClass('left-eye');
	leftEye.addClass(this.face.eyeColor);

	var rightEye = document.createElement('div');
	rightEye.addClass('right-eye');
	rightEye.addClass(this.face.eyeColor);

	var nose = document.createElement('div');
	nose.addClass('nose');

	var mouth = document.createElement('div');
	mouth.addClass('mouth');

	head.appendChild(leftEye);
	head.appendChild(rightEye);
	head.appendChild(nose);
	head.appendChild(mouth);

	var leftArm = document.createElement('div');
	leftArm.addClass('left-arm');
	leftArm.addClass(this.body.color);

	var rightArm = document.createElement('div');
	rightArm.addClass('right-arm');
	rightArm.addClass(this.body.color);

	var body = document.createElement('div');
	body.addClass('body');
	body.addClass(this.body.color);

	var leftLeg = document.createElement('div');
	leftLeg.addClass('left-leg');
	leftLeg.addClass(this.legs.color);

	var rightLeg = document.createElement('div');
	rightLeg.addClass('right-leg');
	rightLeg.addClass(this.legs.color);

	this.ele.appendChild(head);
	this.ele.appendChild(leftArm);
	this.ele.appendChild(rightArm);
	this.ele.appendChild(body);
	this.ele.appendChild(leftLeg);
	this.ele.appendChild(rightLeg);

	// set position
	this.ele.style.left = this.position.left;
	this.ele.style.bottom = this.position.bottom;

	// set dimensions
	this.ele.style.height = this.dimensions.height;
	this.ele.style.width = this.dimensions.width;

}