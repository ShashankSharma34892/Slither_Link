const randomElementFromArray = (arr) => {
	return arr[Math.floor(Math.random() * arr.length)];
};

const drawCell = (i, j) => {
	topext.fillStyle = "#000";
	bottext.fillRect(
		i * cell_size + padding,
		j * cell_size + padding,
		cell_size + dot_siz,
		cell_size + dot_siz
		// i * cell_size + padding + dot_siz,
		// j * cell_size + padding + dot_siz,
		// cell_size - dot_siz,
		// cell_size - dot_siz
	);
};

const drawGrid = () => {
	bottext.clearRect(0, 0, canvas_botm.width, canvas_botm.height);
	bottext.fillStyle = "#000";

	for (let i = 0; i <= cell_no; i++) {
		for (let j = 0; j <= cell_no; j++) {
			bottext.fillRect(
				i * cell_size + padding,
				j * cell_size + padding,
				dot_siz,
				dot_siz
			);
		}
	}
};
// if (j < cell_no && i < cell_no && grid_matrix[j][i] > 0) {
// start.x1 = i * cell_size + padding;
// start.y1 = j * cell_size + padding;
// bottext.fillText(
// `${grid_matrix[j][i]}`,
// i * cell_size + cell_size / 2 - 5 + padding,
// j * cell_size + cell_size / 2 + 10 + padding
// );
// }

const getLine = (coords) => {
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
};

const containsLine = (obj_array, obj) => {
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
};

const getImgCoords = () => {
	return {
		x:
			click_line.width > click_line.height
				? click_line.x + click_line.width / 2 - img_width / 2
				: click_line.x - img_height / 2 + dot_siz / 2,
		y:
			click_line.width > click_line.height
				? click_line.y - img_width / 2 + dot_siz / 2
				: click_line.y + click_line.height / 2 - img_height / 2,
	};
};

const drawHoverLine = () => {
	topext.fillStyle = "rgba(1, 218, 196, 0.8)";
	topext.fillRect(hov_line.x, hov_line.y, hov_line.width, hov_line.height);
};

const drawLine = () => {
	topext.fillStyle = "black";
	topext.fillRect(
		click_line.x,
		click_line.y,
		click_line.width,
		click_line.height
	);
};

const clearLine = (line) => {
	if (line) {
		topext.clearRect(line.x, line.y, line.width, line.height);
	}
};

const drawCross = () => {
	topext.drawImage(img, img_coords.x, img_coords.y, img_width, img_height);
};

const clearCross = () => {
	topext.clearRect(img_coords.x, img_coords.y, img_width, img_height);
};
