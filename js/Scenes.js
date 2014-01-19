var Scenes = {
	"switchToScene": function switchToScene(scene) {
		// request the scene data

		// load the scene javascript

		// load the scene css

	},
	"scene": {
		"itemWidth":310,
		"items":[],
		"width": function(itemWidth) {
			var itemWidth = itemWidth || this.itemWidth;
			return document.querySelector('#scene').offsetWidth + itemWidth;
		},
		"height": function() {
			return document.querySelector('#scene').offsetHeight
		},
		"rowCount": function() {
			return 5;
		},
		"columnCount": function(itemWidth) {
			var itemWidth = itemWidth || this.itemWidth,
				count = Math.floor(this.width(itemWidth) / ((itemWidth * 2) / 3)) || 10;
			return count;
		},
		"rowSize": function() {
			return this.height() / this.rowCount()
		},
		"columnSize": function(itemWidth) {
			var itemWidth = itemWidth || this.itemWidth;
			return this.width() / this.columnCount(itemWidth)
		},
		"addItem": function(index, tree) {
			this.items[index] = tree;
			this.items[index + this.columnCount(tree.tree.offsetWidth)] = this.items[index - this.columnCount(tree.tree.offsetWidth)] = this.items[index + 1] = this.items[index - 1] = "BLOCKED";
		}
	}
};