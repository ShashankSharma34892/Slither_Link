const wrapper = document.querySelector(".wrapper");

const canvas_botm = document.querySelector("#bot_canvas"),
	top_canvas = document.querySelector("#top_canvas"),
	bottext = canvas_botm.getContext("2d"),
	topext = top_canvas.getContext("2d");

const canvas_siz = 400,
	padding = 15,
	dot_siz = 4,
	cell_no = 7,
	cell_size = Math.floor(canvas_siz / cell_no);

wrapper.setAttribute(
	"style",
	`width: ${canvas_siz + 100}px; height: ${canvas_siz + 100}px`
);

top_canvas.width =
	top_canvas.height =
	canvas_botm.width =
	canvas_botm.height =
		canvas_siz + dot_siz + padding * 2;

bottext.font = `normal ${cell_size - 32}pt Cascadia Code`;

drawGrid();
