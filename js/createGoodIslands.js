function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// for picking a random cell
// const coord = Array.from({ length: cellNo }, (_, i) => i);

const cellNo = 7

const cells = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
]

const possibleMoves = [
    [-1, 0], // up
    [+1, 0], // down
    [0, -1], // left
    [0, +1], // right
]

// -- good cells can take 1/4 to 1/2 of entire grid space
function createGoodIslands() {
    const noOfStartingEdgeCells = Math.round(Math.random() * (6 - 3)) + 3

    let noOfBadCells = Math.round(
        (Math.random() > 0.5 ? 0.5 : 0.25) * cellNo * cellNo
    )
    // console.log("-- no of bad cells = ", noOfBadCells);

    let goodCells = []
    let edgeCells = []

    // -- choose N random cells around the edge of grid
    let boundNo = -1

    for (let _ = 0; _ < noOfStartingEdgeCells; _++) {
        const halfChance = Math.round(Math.random()),
            i = Math.floor(Math.random() * cellNo),
            edge = Math.round(Math.random()) * (cellNo - 1)

        let rx = halfChance ? i : edge,
            ry = halfChance ? edge : i

        // console.log("cell = ", ry, rx, " => ", cells[ry][rx])

        console.log(boundNo)
        if (cells[ry][rx] >= 0 && cells[ry][rx] !== "O") {
            // console.log("   pushed")

            edgeCells.push([ry, rx])
            cells[ry][rx] = "O"
            goodCells.push([ry, rx])
            noOfBadCells--

            possibleMoves
                .filter((move) => {
                    ry += move[0]
                    rx += move[1]

                    const isPossible =
                        ry >= 0 &&
                        ry < cellNo &&
                        rx >= 0 &&
                        rx < cellNo &&
                        cells[ry][rx]

                    ry -= move[0]
                    rx -= move[1]

                    return isPossible
                })
                .forEach((mov) => {
                    ry += mov[0]
                    rx += mov[1]
                    if (cells[ry][rx] > -1) {
                        cells[ry][rx] = boundNo
                    }
                    ry -= mov[0]
                    rx -= mov[1]
                })

            boundNo = (boundNo % noOfStartingEdgeCells) - 1
        } else {
            // console.log("   no lol")
        }

        console.table(cells)
    }
    // console.table(cells);

    // gutten cellen beguin
    let aroundValaNo = -1
    // {
    while (edgeCells.length) {
        // for (let _ = 0; _ < 2; _++) {
        // console.log("-- noOfBadCells = ", noOfBadCells);
        console.log("edgeCells => ", edgeCells)
        // console.log("goodCells = ", goodCells);

        edgeCells.forEach((edge) => {
            console.log("\n edge => ", edge)
            cells[edge[0]][edge[1]] = 0

            const posbleDirs = possibleMoves.filter((move) => {
                edge[0] += move[0]
                edge[1] += move[1]
                // console.log("  move = ", move, "  edge = ", edge);

                const isPossible =
                    edge[0] >= 0 &&
                    edge[0] < cellNo &&
                    edge[1] >= 0 &&
                    edge[1] < cellNo &&
                    cells[edge[0]][edge[1]]

                edge[0] -= move[0]
                edge[1] -= move[1]

                return isPossible
            })
            console.log("   posbleDirs = ", posbleDirs)

            if (posbleDirs.length) {
                posbleDirs.forEach((mov) => {
                    edge[0] += mov[0]
                    edge[1] += mov[1]
                    console.log("       ------------")
                    console.log("       mov = ", mov)
                    console.log("       edge => ", edge)
                    console.log("       | aroundValaNo = ", aroundValaNo)

                    console.log(
                        "       cell = ",
                        edge[0],
                        edge[1],
                        " => ",
                        cells[edge[0]][edge[1]]
                    )
                    if (cells[edge[0]][edge[1]] === 1) {
                        cells[edge[0]][edge[1]] = aroundValaNo
                        console.log("       MADE ", aroundValaNo)
                    } else {
                        console.log("       NOT GUTT ")
                    }

                    edge[0] -= mov[0]
                    edge[1] -= mov[1]
                })
                console.log("       ------------")
                console.table(cells)

                const chosedMov = getRandomValueFromArray(posbleDirs)
                console.log("   ~~~~~~~~~~~~~~~~~~~~~~~~~~")
                console.log("   chosedMov = ", chosedMov)
                console.log("   MAKE O  ")

                edge[0] += chosedMov[0]
                edge[1] += chosedMov[1]
                cells[edge[0]][edge[1]] = "O"

                console.table(cells)
                console.log("   ~~~~~~~~~~~~~~~~~~~~~~~~~~")
            } else {
                edgeCells.splice(edgeCells.indexOf(edge), 1)
                console.log("   NO POSBLE\n   edgeCells => ", edgeCells)
            }

            aroundValaNo = (aroundValaNo % edgeCells.length) - 1
        })
        // console.table(cells);
        console.log("\n////////////////////////////////////////////////////")
    }
}

createGoodIslands()

// ) {
// console.log(
// `  move = ${[
// (edge[0] += move[0]),
// (edge[1] += move[1]),
// ]}   cool innit`
// );
// (edge[0] += move[0]), (edge[1] += move[1]);

// possibleMoves.push(edge);
// } else {
// console.log(
// `  move = ${[
// (edge[0] += move[0]),
// (edge[1] += move[1]),
// ]}   no move lmao`
// );
// }
