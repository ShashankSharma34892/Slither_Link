const IMG_CROSS = new Image()
const CROSS_WIDTH = 15
const CROSS_HEIGHT = 14
IMG_CROSS.src = "../img/thicc_x.png"

let markedLines = []
let markedCrosses = []

let previousHoveredLine = 0

topCanvas.addEventListener("mousemove", (event) => {
    let currDinates = {
        x: event.offsetX - padding,
        y: event.offsetY - padding,
    }

    let currentHoveredLine = getLine(currDinates)

    let lineMarked = hasLine(markedLines, currentHoveredLine)[0]
    let lineCrossed = hasLine(markedCrosses, currentHoveredLine)[0]
    let previousLineMarked = hasLine(markedLines, previousHoveredLine)[0]
    let previousLineCrossed = hasLine(markedCrosses, previousHoveredLine)[0]

    if (event.ctrlKey) {
        if (!lineMarked && !lineCrossed) {
            // line is not marked or crossed

            if (previousHoveredLine === 0) { 
                // no previous line
                drawHoverLine(currentHoveredLine)
                previousHoveredLine = currentHoveredLine
            } else if (
                currentHoveredLine.x !== previousHoveredLine.x ||
                currentHoveredLine.y !== previousHoveredLine.y ||
                currentHoveredLine.width !== previousHoveredLine.width ||
                currentHoveredLine.height !== previousHoveredLine.height
            ) {
                // if current line same as previous line dont do nothin
                if (!previousLineMarked && !previousLineCrossed) {
                    // clear previous line if not marked or crossed
                    clearLine(previousHoveredLine)
                }
                drawHoverLine(currentHoveredLine)
                previousHoveredLine = currentHoveredLine
            }
        }
    } else {
        // when let go of ctrl it should disappear
        if (!previousLineMarked && !previousLineCrossed) {
            clearLine(previousHoveredLine)
        }
        previousHoveredLine = 0
    }
})

topCanvas.addEventListener("mousedown", (event) => {
    let currDinates = {
        x: Math.abs(event.offsetX - padding),
        y: Math.abs(event.offsetY - padding),
    }

    let clickedLine = getLine(currDinates)
    let imgCrossCoords = getImgCoords(
        clickedLine.x,
        clickedLine.y,
        clickedLine.width,
        clickedLine.height,
        CROSS_WIDTH,
        CROSS_HEIGHT,
    )

    let [crossMarked, crossIndex_] = hasLine(markedCrosses, clickedLine)
    if (crossMarked) {
        // clear cross  draw line
        topContext.clearRect(
            imgCrossCoords.x,
            imgCrossCoords.y,
            CROSS_WIDTH,
            CROSS_HEIGHT,
        )
        markedCrosses.splice(crossIndex_, 1)

        drawLine(clickedLine)
        markedLines.push(clickedLine)
        
        return 0
    }

    let [lineMarked, lineIndex_] = hasLine(markedLines, clickedLine)
    if (lineMarked) {
        // clear line
        clearLine(markedLines[lineIndex_])
        markedLines.splice(lineIndex_, 1)
    } else {
        // draw line
        drawLine(clickedLine)
        markedLines.push(clickedLine)
    }
})

topCanvas.addEventListener("contextmenu", (event) => {
    event.preventDefault()

    let currDinates = {
        x: event.offsetX - padding,
        y: event.offsetY - padding,
    }
    let clickedLine = getLine(currDinates)
    let imgCrossCoords = getImgCoords(
        clickedLine.x,
        clickedLine.y,
        clickedLine.width,
        clickedLine.height,
        CROSS_WIDTH,
        CROSS_HEIGHT,
    )

    let [lineMarked, lineIndex_] = hasLine(markedLines, clickedLine)
    if (lineMarked) {
        // clear line  draw cross
        clearLine(markedLines[lineIndex_])
        markedLines.splice(lineIndex_, 1)

        topContext.drawImage(
            IMG_CROSS,
            imgCrossCoords.x,
            imgCrossCoords.y,
            CROSS_WIDTH,
            CROSS_HEIGHT,
        )
        markedCrosses.push(clickedLine)
        
        return 0
    }

    let [crossMarked, crossIndex_] = hasLine(markedCrosses, clickedLine)
    if (crossMarked) {
        // clear cross
        topContext.clearRect(
            imgCrossCoords.x,
            imgCrossCoords.y,
            CROSS_WIDTH,
            CROSS_HEIGHT,
        )
        markedCrosses.splice(crossIndex_, 1)
    } else {
        // draw cross
        topContext.drawImage(
            IMG_CROSS,
            imgCrossCoords.x,
            imgCrossCoords.y,
            CROSS_WIDTH,
            CROSS_HEIGHT,
        )
        markedCrosses.push(clickedLine)
    }
})

topCanvas.addEventListener("mouseleave", () => {
    clearLine(previousHoveredLine)
    previousHoveredLine = 0
})

let badcells = []
// fill cell pura for the thing

// topCanvas.addEventListener("mousedown", (event) => {
// let curCell = {
// x: Math.floor((event.offsetX - padding) / cellSize) * cellSize,
// y: Math.floor((event.offsetY - padding) / cellSize) * cellSize,
// }
// console.log(`%c${curCell.x}, ${curCell.y}`, "color: rgb(58, 112, 173)")
//
// let index_ = contains(badcells, curCell)
// if (index_ + 1) {
// topContext.fillRect(
// curCell.x + padding,
// curCell.y + padding,
// cellSize + dotSiz,
// cellSize + dotSiz
// )
// badcells.splice(index_, 1)
// } else {
// topContext.clearRect(
// curCell.x + padding + dotSiz,
// curCell.y + padding + dotSiz,
// cellSize - dotSiz,
// cellSize - dotSiz
// )
// badcells.push(curCell)
// }
// })
