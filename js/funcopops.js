function randomElementFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

function clearCell(cell) {
	// topext.fillStyle = "black";
	topext.clearRect(
		cell.x * cell_size + padding,
		cell.y * cell_size + padding,
		cell_size,
		cell_size
	);
}

function drawGridDots() {
	botext.clearRect(0, 0, bot_canvas.width, bot_canvas.height);
	botext.fillStyle = "#000";

	for (let i = 0; i <= cell_no; i++) {
		for (let j = 0; j <= cell_no; j++) {
			botext.fillRect(
				i * cell_size + padding,
				j * cell_size + padding,
				dot_siz,
				dot_siz
			);
		}
	}
}

function getLine(coords) {
	// good luck understanding any of this shit lmoa

	const cell_points = {
		x1: Math.floor(coords.x / cell_size) * cell_size,
		y1: Math.floor(coords.y / cell_size) * cell_size,
		x2: Math.ceil(coords.x / cell_size) * cell_size,
		y2: Math.ceil(coords.y / cell_size) * cell_size,
	};

	const x = cell_points.x1 != 0 ? coords.x % cell_points.x1 : coords.x,
		y = cell_points.y1 != 0 ? coords.y % cell_points.y1 : coords.y;

	if (x >= y) {
		if (x < cell_size - y) {
			return {
				x: cell_points.x1 + dot_siz + padding,
				y: cell_points.y1 + padding,
				width: cell_size - dot_siz,
				height: dot_siz,
			};
		} else {
			return {
				x: cell_points.x2 + padding,
				y: cell_points.y1 + dot_siz + padding,
				width: dot_siz,
				height: cell_size - dot_siz,
			};
		}
	} else {
		if (y < cell_size - x) {
			return {
				x: cell_points.x1 + padding,
				y: cell_points.y1 + dot_siz + padding,
				width: dot_siz,
				height: cell_size - dot_siz,
			};
		} else {
			return {
				x: cell_points.x1 + dot_siz + padding,
				y: cell_points.y2 + padding,
				width: cell_size - dot_siz,
				height: dot_siz,
			};
		}
	}
}

function containsLine(obj_array, obj) {
	for (let i = 0; i < obj_array.length; i++) {
		if (
			obj.x === obj_array[i].x &&
			obj.y === obj_array[i].y &&
			obj.width === obj_array[i].width &&
			obj.height === obj_array[i].height
		)
			return i;
	}
	return -1;
}

function getImgCoords(x, y, width, height) {
	return {
		x:
			width > height
				? x + width / 2 - img_width / 2
				: x - img_height / 2 + dot_siz / 2,
		y:
			width > height
				? y - img_width / 2 + dot_siz / 2
				: y + height / 2 - img_height / 2,
	};
}

function drawHoverLine(line) {
	topext.fillStyle = "rgba(1, 218, 196, 0.8)";
	topext.fillRect(line.x, line.y, line.width, line.height);
}

function drawLine(line) {
	topext.fillStyle = "black";
	topext.fillRect(line.x, line.y, line.width, line.height);
}

function clearLine(line) {
	if (line) {
		topext.clearRect(line.x, line.y, line.width, line.height);
	}
}

function contains(obj_array, obj) {
	for (let i = 0; i < obj_array.length; i++) {
		if (obj.x === obj_array[i].x && obj.y === obj_array[i].y) {
			return i;
		}
	}
	return -1;
}
