const daddy = document.querySelector(".daddy")

const botCanvas = document.querySelector("#botCanvas"),
    botContext = botCanvas.getContext("2d"),
    topCanvas = document.querySelector("#topCanvas"),
    topContext = topCanvas.getContext("2d")

const canvasSiz = 400,
    padding = 15,
    dotSiz = 4,
    cellCount = 7,
    cellSize = Math.floor(canvasSiz / cellCount)

topCanvas.width =
    topCanvas.height =
    botCanvas.width =
    botCanvas.height =
        canvasSiz + dotSiz + padding * 2

botContext.font = `normal ${cellSize - 40}pt Cascadia Code`
daddy.setAttribute(
    "style",
    `width: ${canvasSiz + 100}px; height: ${canvasSiz + 100}px`
)

drawGridDots()

// -- fill enitre grid with bad cells
// topContext.fillRect(
// padding,
// padding,
// topCanvas.width - padding * 2,
// topCanvas.height - padding * 2
// )
