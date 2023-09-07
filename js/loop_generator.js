const starting_cell = {
	x: randomElementFromArray(coord),
	y: randomElementFromArray(coord),
};
const bad_cells = [];

const possible_moves = [
	[0, -1], // up
	[+1, 0], // right
	[0, +1], // down
	[-1, 0], // left
];

const cells = [
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
];

function containsCell(obj_array, obj) {
	for (let i = 0; i < obj_array.length; i++) {
		if (obj.x === obj_array[i].x && obj.y === obj_array[i].y) {
			return true;
		}
	}
	return false;
}
function traceLoop(pre_cell) {
	let cell = { x: pre_cell.x, y: pre_cell.y };
	let directions = [0, 1, 2, 3];

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

	let m = randomElementFromArray(directions);
	if (m === undefined) {
		return 0;
	}

	cell.x += possible_moves[m][0];
	cell.y += possible_moves[m][1];
	drawCell(cell.x, cell.y);
	bad_cells.push(cell);

	if (cell.x != starting_cell.x || cell.y != starting_cell.y) {
		let fail = traceLoop(cell);
		if (fail) {
			traceLoop(bad_cells[bad_cells.length - 1]);
		}
	}
}

// drawCell(starting_cell.x, starting_cell.y);
// createGoodIslands();
