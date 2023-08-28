const c = [];

for (let i = 0; i < cell_no; i++) {
	c[i] = i;
}

const start = {
	x: randomElementFromArray(c),
	y: randomElementFromArray(c),
};

pickRandCell(start.x, start.y);

const bad_cells = [];

const containsCell = (obj_array, obj) => {
	for (let i = 0; i < obj_array.length; i++) {
		if (obj.x === obj_array[i].x && obj.y === obj_array[i].y) {
			return true;
		}
	}
	return false;
};

const traceLoop = (pre_cell) => {
	const possible_moves = [
		[0, -1], // up
		[+1, 0], // right
		[0, +1], // down
		[-1, 0], // left
	];
	let cell = { x: pre_cell.x, y: pre_cell.y };
	let directions = [0, 1, 2, 3],
		m;

	if (
		cell.y - 1 < 0 ||
		containsCell(bad_cells, { x: cell.x, y: cell.y - 1 })
	) {
		directions.splice(directions.indexOf(0), 1);
	}
	if (
		cell.x + 1 >= cell_no ||
		containsCell(bad_cells, { x: cell.x + 1, y: cell.y })
	) {
		directions.splice(directions.indexOf(1), 1);
	}
	if (
		cell.y + 1 >= cell_no ||
		containsCell(bad_cells, { x: cell.x, y: cell.y + 1 })
	) {
		directions.splice(directions.indexOf(2), 1);
	}
	if (
		cell.x - 1 < 0 ||
		containsCell(bad_cells, { x: cell.x - 1, y: cell.y })
	) {
		directions.splice(directions.indexOf(3), 1);
	}

	m = randomElementFromArray(directions);
	if (m === undefined) {
		return 0;
	}

	cell.x += possible_moves[m][0];
	cell.y += possible_moves[m][1];
	drawCell(cell.x, cell.y);
	bad_cells.push(cell);

	if (cell.x != start.x || cell.y != start.y) {
		let fail = traceLoop(cell);
		if (fail) {
			traceLoop(bad_cells[bad_cells.length - 1]);
		}
	}
};

// traceLoop(start);
