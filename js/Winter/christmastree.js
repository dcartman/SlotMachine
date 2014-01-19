function ChristmasTree(container) {
	this.tree = document.createElement('div');
	var body = document.createElement('div'),
		bottom = document.createElement('div'),
		shadow = document.createElement('div'),
		sbottom = document.createElement('div'),
		stump = document.createElement('div');

	this.tree.addClass('tree').addClass('offcenter').addClass('hidden');

	body.addClass('body');
	bottom.addClass('bottom');
	shadow.addClass('shadow');
	sbottom.addClass('sbottom');
	stump.addClass('stump');

	this.tree.appendChild(body);
	this.tree.appendChild(bottom);
	this.tree.appendChild(shadow);
	this.tree.appendChild(sbottom);
	this.tree.appendChild(stump);

	container.appendChild(this.tree);

	this.setPosition();

	this.tree.removeClass('hidden');

	this.tree.object = this;
}

ChristmasTree.prototype = Object.create(FieldItem);

Object.extend(ChristmasTree, {
	"setDimension": function setDimension() {
		if (Scenes.scene.CHRISTMASTREE) {
			this.tree.style.height = Scenes.scene.CHRISTMASTREE.height;
			this.tree.style.width = Scenes.scene.CHRISTMASTREE.width;
		}
	},
	"setPosition": function setPosition() {
		var columnCount = Scenes.scene.columnCount(this.tree.offsetWidth),
			rowCount = Scenes.scene.rowCount(),
			lastPosition = rowCount * columnCount - 1,
			position, open;

		if (Scenes.scene.items[lastPosition] === undefined) {
			position = lastPosition;
		} else {
			var open = Scenes.scene.items.openpositions();
			index = Math.floor((Math.random() * open.length));
			position = open[index];
			if (open.length == 0) this.tree.style.display = "none";
		}

		Scenes.scene.addItem(position, this);

		var selectedRow = Math.floor(position / columnCount) * (0 - 1),
			selectedColumn = position % columnCount,
			top = selectedRow * Scenes.scene.rowSize(),
			left = selectedColumn * this.tree.offsetWidth - (this.tree.offsetWidth / 2);

		this.tree.style.left = left + "px";
		this.tree.style.bottom = "10%";
		this.tree.style.webkitTransform = "translateZ(" + top + "px)";
		this.tree.style.zIndex = Math.floor(top);
	}
});
