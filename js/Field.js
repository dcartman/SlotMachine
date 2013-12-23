var Field = {
	"width": function(treeWidth) {
		var treeWidth = treeWidth || 0;
		return document.body.offsetWidth + treeWidth;
	},
	"height": function() {
		return document.body.offsetHeight
	},
	"rowCount": function() {
		return 10;
	},
	"columnCount": function(treeWidth) {
		var count = Math.floor(this.width(treeWidth) / ((treeWidth * 2) / 3)) || 10;
		return count;
	},
	"rowSize": function() {
		return this.height() / this.rowCount()
	},
	"columnSize": function(treeWidth) {
		return this.width() / this.columnCount(treeWidth)
	},
	"addTree": function(index, tree) {
		this.trees[index] = tree;
		this.trees[index + this.rowCount()] = this.trees[index - this.rowCount()] = this.trees[index + 1] = this.trees[index - 1] = "BLOCKED";
	},
	"trees": []
};