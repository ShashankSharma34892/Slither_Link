function getRandomElementFromArray(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function clearCell(cell) {
    // topContext.fillStyle = "black";
    topContext.clearRect(
        cell.x * cellSize + padding,
        cell.y * cellSize + padding,
        cellSize,
        cellSize,
    )
}

function drawGridDots() {
    botContext.clearRect(0, 0, botCanvas.width, botCanvas.height)
    botContext.fillStyle = "#000"

    for (let i = 0; i <= cellCount; i++) {
        for (let j = 0; j <= cellCount; j++) {
            if (Math.random() < 0.4) {
                botContext.fillText(
                    getRandomElementFromArray([1, 2, 3]),
                    i * cellSize + 39,
                    j * cellSize - 2,
                )
            }
            botContext.fillRect(
                i * cellSize + padding,
                j * cellSize + padding,
                dotSiz,
                dotSiz,
            )
        }
    }
}

function getLine(coords) {
    // good luck understanding any of this shit lmoa

    const cellPoints = {
        x1: Math.floor(coords.x / cellSize) * cellSize,
        y1: Math.floor(coords.y / cellSize) * cellSize,
        x2: Math.ceil(coords.x / cellSize) * cellSize,
        y2: Math.ceil(coords.y / cellSize) * cellSize,
    }

    const x = cellPoints.x1 != 0 ? coords.x % cellPoints.x1 : coords.x,
        y = cellPoints.y1 != 0 ? coords.y % cellPoints.y1 : coords.y

    if (x >= y) {
        if (x < cellSize - y) {
            return {
                x: cellPoints.x1 + dotSiz + padding,
                y: cellPoints.y1 + padding,
                width: cellSize - dotSiz,
                height: dotSiz,
            }
        } else {
            return {
                x: cellPoints.x2 + padding,
                y: cellPoints.y1 + dotSiz + padding,
                width: dotSiz,
                height: cellSize - dotSiz,
            }
        }
    } else {
        if (y < cellSize - x) {
            return {
                x: cellPoints.x1 + padding,
                y: cellPoints.y1 + dotSiz + padding,
                width: dotSiz,
                height: cellSize - dotSiz,
            }
        } else {
            return {
                x: cellPoints.x1 + dotSiz + padding,
                y: cellPoints.y2 + padding,
                width: cellSize - dotSiz,
                height: dotSiz,
            }
        }
    }
}

function hasLine(objArray, obj) {
    for (let i = 0; i < objArray.length; i++) {
        if (
            obj.x === objArray[i].x &&
            obj.y === objArray[i].y &&
            obj.width === objArray[i].width &&
            obj.height === objArray[i].height
        )
            return [1, i]
    }
    return [0, null]
}

function getImgCoords(x, y, width, height, IMG_WIDTH, IMG_HEIGHT) {
    return {
        x:
            width > height
                ? x + width / 2 - IMG_WIDTH / 2
                : x - IMG_HEIGHT / 2 + dotSiz / 2,
        y:
            width > height
                ? y - IMG_WIDTH / 2 + dotSiz / 2
                : y + height / 2 - IMG_HEIGHT / 2,
    }
}

function drawHoverLine(line) {
    topContext.fillStyle = "rgba(1, 218, 196, 0.8)"
    topContext.fillRect(line.x, line.y, line.width, line.height)
}

function drawLine(line) {
    topContext.fillStyle = "rgba(60, 61, 66, 1)"
    topContext.fillRect(line.x, line.y, line.width, line.height)
}

function clearLine(line) {
    if (line) {
        topContext.clearRect(line.x, line.y, line.width, line.height)
    }
}
