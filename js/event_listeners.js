const img = new Image();
const img_width = (img_height = 14);
img.src = "../img/Transparent_X.png";

let lines = [];
let crosses = [];

let hov_line = 0,
	pre_hov_line = 0;

// top_canvas.addEventListener("mousemove", (event) => {
// let currdinates = {
// x: event.offsetX - padding,
// y: event.offsetY - padding,
// };

// let hov_line = getLine(currdinates);

// let is_hov_clicked = containsLine(lines, hov_line) + 1,
// is_pre_clicked = containsLine(lines, pre_hov_line) + 1,
// is_hov_crossed = containsLine(crosses, hov_line) + 1,
// is_pre_crossed = containsLine(crosses, pre_hov_line) + 1;

// if (event.ctrlKey) {
// if (!is_hov_clicked && !is_hov_crossed) {
// if (
// hov_line.x !== pre_hov_line.x ||
// hov_line.y !== pre_hov_line.y ||
// hov_line.width !== pre_hov_line.width ||
// hov_line.height !== pre_hov_line.height
// ) {
// if (!is_pre_clicked && !is_pre_crossed) {
// clearLine(pre_hov_line);
// }
// drawHoverLine(hov_line);
// pre_hov_line = hov_line;
// }
// }
// } else {
// if (!is_pre_clicked && !is_pre_crossed) {
// clearLine(pre_hov_line);
// }
// pre_hov_line = 0;
// }
// });

// top_canvas.addEventListener("mousedown", (event) => {
// let currdinates = {
// x: Math.abs(event.offsetX - padding),
// y: Math.abs(event.offsetY - padding),
// };
// let clicked_line = getLine(currdinates);
// let img_coords = getImgCoords(
// clicked_line.x,
// clicked_line.y,
// clicked_line.width,
// clicked_line.height
// );
// let i = containsLine(crosses, clicked_line);

// if (i + 1) {
// topext.clearRect(img_coords.x, img_coords.y, img_width, img_height);
// crosses.splice(i, 1);

// drawLine(clicked_line);
// lines.push(clicked_line);
// return;
// }

// i = containsLine(lines, clicked_line);
// if (i + 1) {
// clearLine(lines[i]);
// lines.splice(i, 1);
// } else {
// drawLine(clicked_line);
// lines.push(clicked_line);
// }
// });

// top_canvas.addEventListener("contextmenu", (event) => {
// event.preventDefault();

// let currdinates = {
// x: event.offsetX - padding,
// y: event.offsetY - padding,
// };
// let clicked_line = getLine(currdinates);
// let img_coords = getImgCoords(
// clicked_line.x,
// clicked_line.y,
// clicked_line.width,
// clicked_line.height
// );
// let i = containsLine(lines, clicked_line);

// if (i + 1) {
// // draw cross
// clearLine(lines[i]);
// lines.splice(i, 1);

// topext.drawImage(
// img,
// img_coords.x,
// img_coords.y,
// img_width,
// img_height
// );

// crosses.push(clicked_line);
// return;
// }

// i = containsLine(crosses, clicked_line);
// if (i + 1) {
// //clear cross
// topext.clearRect(img_coords.x, img_coords.y, img_width, img_height);
// crosses.splice(i, 1);
// } else {
// //draw cross
// clearLine(pre_hov_line);

// topext.drawImage(
// img,
// img_coords.x,
// img_coords.y,
// img_width,
// img_height
// );

// crosses.push(clicked_line);
// }
// });

// top_canvas.addEventListener("mouseleave", () => {
// clearLine(pre_hov_line);
// pre_hov_line = 0;
// });

let badcells = [];

top_canvas.addEventListener("mousedown", (event) => {
	let cur_cell = {
		x: Math.floor((event.offsetX - padding) / cell_size) * cell_size,
		y: Math.floor((event.offsetY - padding) / cell_size) * cell_size,
	};
	console.log(`%c${cur_cell.x}, ${cur_cell.y}`, "color: rgb(58, 112, 173)");

	let i = contains(badcells, cur_cell);
	if (i + 1) {
		topext.fillRect(
			cur_cell.x + padding,
			cur_cell.y + padding,
			cell_size + dot_siz,
			cell_size + dot_siz
		);
		badcells.splice(i, 1);
	} else {
		topext.clearRect(
			cur_cell.x + padding + dot_siz,
			cur_cell.y + padding + dot_siz,
			cell_size - dot_siz,
			cell_size - dot_siz
		);
		badcells.push(cur_cell);
	}
}); 