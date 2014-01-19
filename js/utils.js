Object.extend = function(obj, extension) {
	for (var p in extension) {
		if (extension.hasOwnProperty(p)) {
			obj.prototype[p] = extension[p];
		}
	}
}

Element.prototype.addClass = function(cls) {
	var current = this.className.split(' ');
	if (current.indexOf(cls) == -1) {
		current.push(cls);
	}
	this.className = current.join(' ').trim();
	return this;
}

Element.prototype.removeClass = function(cls) {
	var current = this.className.split(' ');
	if (current.indexOf(cls) > -1) {
		current.splice(current.indexOf(cls), 1);
	}
	this.className = current.join(' ').trim();
	return this;
}

Element.prototype.toggleClass = function(cls) {
	var current = this.className.split(' ');
	if (current.indexOf(cls) > -1) {
		current.splice(current.indexOf(cls), 1);
	} else {
		current.push(cls);
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
	"isConsoleOn": false,
	"turnConsoleOn": function() {
		this.isConsoleOn = true
	},
	"turnConsoleOff": function() {
		this.console = null;
		this.isConsoleOff = false;
	},
	"log": function(msg) {
		try {
			if (this.isConsoleOn) {
				var log = this.createNode({
					"type": "div",
					"content": " == DC == "+ msg
				});
				this.console = this.console || document.getElementById("console");
				if (!this.console) {
					this.console = this.createNode({
						"type": "div",
						"attributes": [{
							"name": "id",
							"value": "console"
						}]
					});
					document.body.appendChild(this.console);
				}
				this.console.appendChild(log);
			}
		} catch (error) {
			console.log(error);
		}
	},
	"clearLog": function() {
		this.console.innerHTML = "";
		document.body.removeChild(this.console);
	},
	"createNode": function(node) {
		var newNode = document.createElement(node.type);
		if (node.attributes && node.attributes.forEach) {
			node.attributes.forEach(function(attr) {
				newNode.setAttribute(attr.name, attr.value);
			}, this);
		}
		if (node.children && node.children.forEach) {
			node.children.forEach(function(child) {
				newNode.appendChild(this.createNode(child));
			}, this);
		}
		if (node.content) {
			newNode.innerHTML += node.content;
		}
		return newNode;
	},

	/**
	 *   Receives the lowest and highest values of a range and
	 *   returns a random integer that falls within that range.
	 **/
	"randomInteger": function randomInteger(low, high) {
		return Math.floor(low + Math.random() * (high - low));
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