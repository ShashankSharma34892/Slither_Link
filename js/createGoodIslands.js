function getRandomValueFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// for picking a random cell
// const coord = Array.from({ length: cell_no }, (_, i) => i);

const cell_no = 7;

const cells = [
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
	[1, 1, 1, 1, 1, 1, 1],
];

const possible_moves = [
	[-1, 0], // up
	[+1, 0], // down
	[0, -1], // left
	[0, +1], // right
];

// -- good cells can take 1/4 to 1/2 of entire grid space
function createGoodIslands() {
	let no_of_bad_cells = Math.round(
		(Math.random() > 0.5 ? 0.5 : 0.25) * cell_no * cell_no
	);
	const no_of_starting_edge_cells = Math.round(Math.random() * (6 - 3)) + 3;
	// console.log("-- no of bad cells = ", no_of_bad_cells);
	let good_cells = [];
	let edge_cells = [];

	// -- choose N random cells around the edge of grid
	let bound_no = -1;
	for (let _ = 0; _ < no_of_starting_edge_cells; _++) {
		const half_chance = Math.round(Math.random()),
			i = Math.floor(Math.random() * cell_no),
			edge = Math.round(Math.random()) * (cell_no - 1);
		let rx = half_chance ? i : edge,
			ry = half_chance ? edge : i;

		console.log("cell = ", ry, rx, " => ", cells[ry][rx]);
		if (cells[ry][rx] >= 0 && cells[ry][rx] !== "O") {
			console.log("   pushed");
			edge_cells.push([ry, rx]);
			cells[ry][rx] = "O";
			good_cells.push([ry, rx]);
			no_of_bad_cells--;

			possible_moves
				.filter((move) => {
					ry += move[0];
					rx += move[1];

					const isPossible =
						ry >= 0 &&
						ry < cell_no &&
						rx >= 0 &&
						rx < cell_no &&
						cells[ry][rx];

					ry -= move[0];
					rx -= move[1];

					return isPossible;
				})
				.forEach((mov) => {
					ry += mov[0];
					rx += mov[1];
					if (cells[ry][rx] !== bound_no) {
						cells[ry][rx] = bound_no;
					}
					ry -= mov[0];
					rx -= mov[1];
				});
		} else {
			console.log("   no");
		}
		// console.log(bound_no);
		bound_no = (bound_no % no_of_starting_edge_cells) - 1;
		console.table(cells);
	}
	console.table(cells);

	let boundary_no = -1;
	{
		// while (edge_cells.length) {
		// for (let _ = 0; _ < 2; _++) {
		// console.log("-- no_of_bad_cells = ", no_of_bad_cells);
		console.log("edge_cells => ", edge_cells);
		// console.log("good_cells = ", good_cells);

		edge_cells.forEach((edge) => {
			console.log("\n edge => ", edge);
			cells[edge[0]][edge[1]] = 0;

			const posble_dirs = possible_moves.filter((move) => {
				edge[0] += move[0];
				edge[1] += move[1];
				// console.log("  move = ", move, "  edge = ", edge);

				const isPossible =
					edge[0] >= 0 &&
					edge[0] < cell_no &&
					edge[1] >= 0 &&
					edge[1] < cell_no &&
					cells[edge[0]][edge[1]];

				edge[0] -= move[0];
				edge[1] -= move[1];

				return isPossible;
			});
			console.log("   posble_dirs = ", posble_dirs);

			if (posble_dirs.length) {
				posble_dirs.forEach((mov) => {
					edge[0] += mov[0];
					edge[1] += mov[1];
					console.log("       ------------");
					console.log("       mov = ", mov);
					console.log("       edge => ", edge);
					console.log("       - boundary_no = ", boundary_no);

					console.log(
						"       cell = ",
						edge[0],
						edge[1],
						" => ",
						cells[edge[0]][edge[1]]
					);
					if (cells[edge[0]][edge[1]] !== boundary_no) {
						cells[edge[0]][edge[1]] = boundary_no;
						console.log("       MADE ", boundary_no);
					} else {
						console.log("       NOT GUTT ");
					}

					edge[0] -= mov[0];
					edge[1] -= mov[1];
				});
				console.log("           -----------");
				console.table(cells);

				const chosed_mov = getRandomValueFromArray(posble_dirs);
				console.log("   ~~~~~~~~~~~~~~~~~~~~~~~~~~");
				console.log("   chosed_mov = ", chosed_mov);
				console.log("   MAKE O  ");

				edge[0] += chosed_mov[0];
				edge[1] += chosed_mov[1];
				cells[edge[0]][edge[1]] = "O";
				console.table(cells);
				console.log("   ~~~~~~~~~~~~~~~~~~~~~~~~~~");
			} else {
				edge_cells.splice(edge_cells.indexOf(edge), 1);
				console.log("   NO POSBLE\n   edge_cells => ", edge_cells);
			}

			boundary_no = (boundary_no % edge_cells.length) - 1;
		});
		// console.table(cells);
		console.log("\n////////////////////////////////////////////////////");
	}
}

createGoodIslands();

// ) {
// console.log(
// `  move = ${[
// (edge[0] += move[0]),
// (edge[1] += move[1]),
// ]}   cool innit`
// );
// (edge[0] += move[0]), (edge[1] += move[1]);

// possible_moves.push(edge);
// } else {
// console.log(
// `  move = ${[
// (edge[0] += move[0]),
// (edge[1] += move[1]),
// ]}   no move lmao`
// );
// }
