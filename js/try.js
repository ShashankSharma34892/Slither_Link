function getRandomValueFromArray(arr) {
	return arr[Math.floor(Math.random() * arr.length)];
}

// ONGOING: make simple islands for now
// now make them complex 😨 <- scared

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
	[0, -1], // up
	[+1, 0], // right
	[0, +1], // down
	[-1, 0], // left
];

function createGoodIslands() {
	// -- good cells can take 1/4 to 1/2 of entire grid space

	const no_of_starting_edge_cells = Math.round(Math.random() * (6 - 3)) + 3;
	let good_cells = [];
	// let bad_cells = cells;
	let edge_cells = [];

	// -- choose N random cells around the edge of grid
	for (let i = 0; i < no_of_starting_edge_cells; i++) {
		const bogis = Math.round(Math.random()),
			i = Math.floor(Math.random() * cell_no),
			ej = Math.round(Math.random()) * (cell_no - 1),
			rx = bogis ? i : ej,
			ry = bogis ? ej : i;

		edge_cells.push([rx, ry]);
		cells[rx][ry] = 0;
		good_cells.push([rx, ry]);
	}
	console.log(edge_cells);
	console.log(good_cells);
	console.table(cells);

	// -- then just extend them using [CONDITIONS] until [MORECONDITION]
    const shmells = edge_cells.map((edge_arr) => {
        while (penis) {
            const posoms = possible_moves
            const direction = getRandomValueFromArray(posoms);

            // move a direction
            (edge_arr[0] += direction[0]), (edge_arr[1] += direction[1])

            if (
                edge_arr[0] >= 0 &&
                edge_arr[0] < cell_no &&
                edge_arr[1] >= 0 &&
                edge_arr[1] < cell_no &&
                cells[edge_arr[0]][edge_arr[1]]
            ) {
                console.log(`edge_arr = ${edge_arr}`)
            
                cells[edge_arr[0]][edge_arr[1]] = 0
                console.table(cells)
            } else {
                console.log(`no lmao  ${edge_arr}`)
            }

            console.log("\n")
        }
	});
}

createGoodIslands();
