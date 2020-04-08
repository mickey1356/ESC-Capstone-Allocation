function Booth(proj_id, proj_name, proj_type, dimX, dimY) {
	this.proj_id = proj_id;
	this.proj_name = proj_name;
	this.proj_type = proj_type;
	this.dimX = dimX;
	this.dimY = dimY;
}

function Path(rows, cols) {
	this.rows = rows;
	this.cols = cols;

	this.path = null;
}

Path.prototype.next_dir = function(dx, dy) {
	if (dx == 0 && dy == 1) return [-1, 0];
	else if (dx == -1 && dy == 0) return [0, -1];
	else if (dx == 0 && dy == -1) return [1, 0];
	else if (dx == 1 && dy == 0) return [0, 1];
	else {
		console.log("Invalid direction specified");
	}
}

Path.prototype.build_path_tlbr = function() {
	this.path = [];
	for (let y = 0; y < this.rows; y++) {
		for (let x = 0; x < this.cols; x++) {
			this.path.push([x, y]);
		}
	}
}

Path.prototype.build_path_spiralout = function(initial_x, initial_y, initial_dx, initial_dy) {
	this.path = [[initial_x, initial_y]];

	let dx = initial_dx;
	let dy = initial_dy;
	let cx = initial_x;
	let cy = initial_y;

	let steps = 1;

	while (this.path.length < this.rows * this.cols) {
		for (let i = 0; i < 2; i++) {
			for (let diff = 0; diff < steps; diff++) {
				let x = (diff + 1) * dx + cx;
				let y = (diff + 1) * dy + cy;
				if (x >= 0 && x < this.cols && y >= 0 && y < this.rows) {
					this.path.push([x, y]);
				}
			}
			cx += steps * dx;
			cy += steps * dy;
			let d = this.next_dir(dx, dy);
			dx = d[0];
			dy = d[1];
		}
		steps++;
	}
}

Path.prototype.get_rep = function() {
	return this.path;
}

function Allocator() {
	this.grid = null;
	this.booths = null;
	this.allocation = {};
	this.cols = 0;
	this.rows = 0;
}

// Allocator.prototype.read_grid = function(space_file, callback) {
// 	let xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200 && callback) {
// 			callback(this.responseText);
// 		}
// 	}
//
// 	xhttp.open("GET", space_file, true);
// 	xhttp.send();
// }

Allocator.prototype.load_grid = function(string) {
	this.grid = [];
	for (let line of string.split("\n")) {
		let row = []
		for (let cell of line.split(",")) {
			row.push(+cell);
		}
		this.grid.push(row);
	}
	this.cols = this.grid[0].length;
	this.rows = this.grid.length;
}

// Allocator.prototype.read_booths = function(booth_file, callback) {
// 	let xhttp = new XMLHttpRequest();
// 	xhttp.onreadystatechange = function() {
// 		if (this.readyState == 4 && this.status == 200 && callback) {
// 			callback(this.responseText);
// 		}
// 	}
//
// 	xhttp.open("GET", booth_file, true);
// 	xhttp.send();
// }

// Allocator.prototype.load_booths = function(string) {
// 	this.booths = {};
// 	for (let line of string.split("\n")) {
// 		let booth_info = line.split(",");
// 		this.booths[booth_info[0]] = new Booth(booth_info[0], booth_info[1], booth_info[2], (+booth_info[3] * 2), (+booth_info[4] * 2));
// 	}
// }

Allocator.prototype.load_booths_obj = function(json_arr) {
	this.booths = {};
	for (let obj of json_arr) {
		// id groupName prototype category width breadth
		const id = obj["id"];
		const groupName = obj["groupName"];
		const category = obj["category"];
		const width = obj["width"];
		const height = obj["height"];

		this.booths[id] = new Booth(id, groupName, category, width * 2, height * 2);
	}
}

Allocator.prototype.space_free = function(posX, posY, dimX, dimY) {
	for (let dx = 0; dx < dimX; dx++) {
		for (let dy = 0; dy < dimY; dy++){
			let x = posX + dx;
			let y = posY + dy;
			if ((x < this.cols && y < this.rows && this.grid[y][x] != 0) || (x >= this.cols || y >= this.rows)) {
				return false;
			}
		}
	}
	return true;
}

Allocator.prototype.assign_booth = function(booth, posX, posY) {
	this.allocation[booth.proj_id] = [posX, posY];
	for (let dx = 0; dx < booth.dimX; dx++) {
		for (let dy = 0; dy < booth.dimY; dy++) {
			let x = posX + dx;
			let y = posY + dy;
			this.grid[y][x] = booth.proj_id;
		}
	}
}

Allocator.prototype.allocate = function() {
    let p = new Path(this.rows, this.cols);
    p.build_path_spiralout(63, 80, 0, 1);

	for (let booth_id in this.booths) {
		let booth = this.booths[booth_id];
		let found = false;
		for (let loc of p.get_rep()) {
			let i = loc[0];
			let j = loc[1];

			if (this.space_free(i, j, booth.dimX + 2, booth.dimY + 2)) {
				this.assign_booth(booth, i + 1, j + 1);
				found = true;
				break;
			}
		}
		if (!found) {
			this.allocation[booth.proj_id] = [-1, -1];
			console.log("not found for booth " + booth.proj_id);
		}
	}
}

exports.Allocator = Allocator;
exports.Path = Path;
