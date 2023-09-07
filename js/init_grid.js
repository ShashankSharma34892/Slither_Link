const wrapper = document.querySelector(".wrapper");

const bot_canvas = document.querySelector("#bot_canvas"),
	botext = bot_canvas.getContext("2d"),
	top_canvas = document.querySelector("#top_canvas"),
	topext = top_canvas.getContext("2d");

const canvas_siz = 400,
	padding = 15,
	dot_siz = 4,
	cell_no = 7,
	cell_size = Math.floor(canvas_siz / cell_no);

top_canvas.width =
	top_canvas.height =
	bot_canvas.width =
	bot_canvas.height =
		canvas_siz + dot_siz + padding * 2;

// -- fill enitre grid with bad cells
topext.fillRect(
    padding,
    padding,
    top_canvas.width - padding * 2,
    top_canvas.height - padding * 2
);

wrapper.setAttribute(
	"style",
	`width: ${canvas_siz + 100}px; height: ${canvas_siz + 100}px`
);

botext.font = `normal ${cell_size - 32}pt Cascadia Code`;

drawGridDots();
