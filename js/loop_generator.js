const startingCell = {
    x: randomElementFromArray(coord),
    y: randomElementFromArray(coord),
}
const badCells = []

const possibleMoves = [
    [0, -1], // up
    [+1, 0], // right
    [0, +1], // down
    [-1, 0], // left
]

const cells = [
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
]

function containsCell(objArray, obj) {
    for (let i = 0; i < objArray.length; i++) {
        if (obj.x === objArray[i].x && obj.y === objArray[i].y) {
            return true
        }
    }
    return false
}
function traceLoop(preCell) {
    let cell = { x: preCell.x, y: preCell.y }
    let directions = [0, 1, 2, 3]

    if (
        cell.y - 1 < 0 ||
        containsCell(badCells, { x: cell.x, y: cell.y - 1 })
    ) {
        directions.splice(directions.indexOf(0), 1)
    }
    if (
        cell.x + 1 >= cellCount ||
        containsCell(badCells, { x: cell.x + 1, y: cell.y })
    ) {
        directions.splice(directions.indexOf(1), 1)
    }
    if (
        cell.y + 1 >= cellCount ||
        containsCell(badCells, { x: cell.x, y: cell.y + 1 })
    ) {
        directions.splice(directions.indexOf(2), 1)
    }
    if (
        cell.x - 1 < 0 ||
        containsCell(badCells, { x: cell.x - 1, y: cell.y })
    ) {
        directions.splice(directions.indexOf(3), 1)
    }

    let m = randomElementFromArray(directions)
    if (m === undefined) {
        return 0
    }

    cell.x += possibleMoves[m][0]
    cell.y += possibleMoves[m][1]
    drawCell(cell.x, cell.y)
    badCells.push(cell)

    if (cell.x != startingCell.x || cell.y != startingCell.y) {
        let fail = traceLoop(cell)
        if (fail) {
            traceLoop(badCells[badCells.length - 1])
        }
    }
}

// drawCell(startingCell.x, startingCell.y);
// createGoodIslands();
