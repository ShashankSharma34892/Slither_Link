function getRandomValueFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

// for picking a random cell
// const coord = Array.from({ length: cellCount }, (_, i) => i);

const cellCount = 7

const cells = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
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
    let noOfBadCells = Math.round(
        (Math.random() > 0.5 ? 0.5 : 0.25) * cellCount * cellCount
    )
    const noOfStartingEdgeCells = Math.round(Math.random() * (6 - 3)) + 3
    let goodCells = []
    let edgeCells = []

    // -- choose N random cells around the edge of grid
    let boundNo = -1

    for (let _ = 0; _ < noOfStartingEdgeCells; _++) {
        const halfChance = Math.round(Math.random()),
            i = Math.floor(Math.random() * cellCount),
            edge = Math.round(Math.random()) * (cellCount - 1)
        let rx = halfChance ? i : edge,
            ry = halfChance ? edge : i

        if (cells[ry][rx] >= 0 && cells[ry][rx] !== "O") {
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
                        ry < cellCount &&
                        rx >= 0 &&
                        rx < cellCount &&
                        cells[ry][rx]

                    ry -= move[0]
                    rx -= move[1]

                    return isPossible
                })
                .forEach((mov) => {
                    ry += mov[0]
                    rx += mov[1]
                    if (cells[ry][rx] !== boundNo + 1) {
                        cells[ry][rx] = boundNo
                    }
                    ry -= mov[0]
                    rx -= mov[1]
                })
        } else {
        }

        boundNo = (boundNo % noOfStartingEdgeCells) - 1
    }

    // gutten cellen beguin
    let boundaryNo = -1
    while (edgeCells.length) {
        // for (let _ = 0; _ < 2; _++) {
        // {
        edgeCells.forEach((edge) => {
            cells[edge[0]][edge[1]] = 0

            const posbleDirs = possibleMoves.filter((move) => {
                edge[0] += move[0]
                edge[1] += move[1]

                const isPossible =
                    edge[0] >= 0 &&
                    edge[0] < cellCount &&
                    edge[1] >= 0 &&
                    edge[1] < cellCount &&
                    cells[edge[0]][edge[1]]

                edge[0] -= move[0]
                edge[1] -= move[1]

                return isPossible
            })

            if (posbleDirs.length) {
                posbleDirs.forEach((mov) => {
                    edge[0] += mov[0]
                    edge[1] += mov[1]

                    if (cells[edge[0]][edge[1]] !== boundaryNo + 1) {
                        cells[edge[0]][edge[1]] = boundaryNo
                    } else {
                    }

                    edge[0] -= mov[0]
                    edge[1] -= mov[1]
                })

                const chosedMov = getRandomValueFromArray(posbleDirs)

                edge[0] += chosedMov[0]
                edge[1] += chosedMov[1]
                cells[edge[0]][edge[1]] = "O"
            } else {
                edgeCells.splice(edgeCells.indexOf(edge), 1)
            }

            boundaryNo = (boundaryNo % edgeCells.length) - 1
        })
    }
    console.table(cells)
}

createGoodIslands()
