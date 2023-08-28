const img = new Image();
const img_width = (img_height = 14);
img.src = "../../utils/images/Transparent_X.png";

let lines = [];
let crosses = [];

let hov_line = 0,
	pre_hov_line = 0;

top_canvas.addEventListener("mousemove", (event) => {
	let currdinates = {
		x: event.offsetX - padding,
		y: event.offsetY - padding,
	};

	hov_line = getLine(currdinates);

	let is_hov_clicked = containsLine(lines, hov_line) + 1,
		is_pre_clicked = containsLine(lines, pre_hov_line) + 1,
		is_hov_crossed = containsLine(crosses, hov_line) + 1,
		is_pre_crossed = containsLine(crosses, pre_hov_line) + 1;

	if (event.ctrlKey) {
		if (!is_hov_clicked && !is_hov_crossed) {
			if (
				hov_line.x !== pre_hov_line.x ||
				hov_line.y !== pre_hov_line.y ||
				hov_line.width !== pre_hov_line.width ||
				hov_line.height !== pre_hov_line.height
			) {
				if (!is_pre_clicked && !is_pre_crossed) clearLine(pre_hov_line);
				drawHoverLine();
				pre_hov_line = hov_line;
			}
		}
	} else {
		if (!is_pre_clicked && !is_pre_crossed) clearLine(pre_hov_line);
		pre_hov_line = 0;
	}
});

top_canvas.addEventListener("mousedown", (event) => {
	let currdinates = {
		x: Math.abs(event.offsetX - padding),
		y: Math.abs(event.offsetY - padding),
	};

	click_line = getLine(currdinates);

	img_coords = getImgCoords();
	i = containsLine(crosses, click_line);
	if (i + 1) {
		clearCross();
		crosses.splice(i, 1);

		drawLine();
		lines.push(click_line);
		return;
	}

	i = containsLine(lines, click_line);
	if (i + 1) {
		clearLine(lines[i]);
		lines.splice(i, 1);
	} else {
		drawLine();
		lines.push(click_line);
	}
});

top_canvas.addEventListener("contextmenu", (event) => {
	event.preventDefault();

	let currdinates = {
		x: event.offsetX - padding,
		y: event.offsetY - padding,
	};

	click_line = getLine(currdinates);
	img_coords = getImgCoords();

	i = containsLine(lines, click_line);
	if (i + 1) {
		clearLine(lines[i]);
		lines.splice(i, 1);

		drawCross();
		crosses.push(click_line);
		return;
	}

	i = containsLine(crosses, click_line);
	if (i + 1) {
		clearCross();
		crosses.splice(i, 1);
	} else {
		clearLine(pre_hov_line);
		drawCross();
		crosses.push(click_line);
	}
});

top_canvas.addEventListener("mouseleave", () => {
	clearLine(pre_hov_line);
	pre_hov_line = 0;
});
