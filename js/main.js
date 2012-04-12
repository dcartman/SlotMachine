$(document).ready(function() {
	var sl = new SlotMachine( document.getElementById('slot-machine'), {} )
});

dpc = {
	isConsoleOn: false,
	log: function( msg ) {
		try {
			if(this.isConsoleOn) {
				var log = this.createNode({ "type":"div","content":msg });
				this.console = this.console || document.getElementById("console");
				if( !this.console ) { 
					this.console = this.createNode({ "type": "div", "attributes": [{ "name":"id", "value":"console" }] });
					document.body.appendChild( this.console );
				}
				this.console.appendChild( log );
			}
		} catch( error ) {
			console.log(error);
		}
	},
	clearLog: function() {
		this.console.innerHTML = "";
		document.body.removeChild( this.console );
	},
	createNode: function( node ) {
		var newNode = document.createElement( node.type );
		if( node.attributes && node.attributes.forEach ) {
			node.attributes.forEach( function(attr) {
				newNode.setAttribute(attr.name, attr.value);
			}, this);
		}
		if( node.children && node.children.forEach ) {
			node.children.forEach( function(child) {
				newNode.appendChild( this.createNode(child) );
			}, this);
		}
		if( node.content ) {
			newNode.innerHTML += node.content;
		}
		return newNode;
	},
	turnConsoleOn: function() { this.isConsoleOn = true },
	turnConsoleOff: function() { this.console = null; this.isConsoleOff = false; }
}