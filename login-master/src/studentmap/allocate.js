function Booth(proj_id, proj_name, proj_type, dimX, dimY) {
	this.proj_id = proj_id;
	this.proj_name = proj_name;
	this.proj_type = proj_type;
	this.dimX = dimX;
	this.dimY = dimY;
}

Booth.prototype.dim = function() {
	return this.dimX * this.dimY;
}

Booth.prototype.flip_dim = function() {
	const dx = this.dimX;
	this.dimX = this.dimY;
	this.dimY = dx;
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

Path.prototype.build_path_verticalout = function(initial_col) {
	this.path = [];
	for (let y = 0; y < this.rows; y++) {
		this.path.push([initial_col, y]);
	}

	let col = initial_col;
	let step = 1;
	let flag = false;
	while (true) {
		col += step;
		if (col >= this.cols || col < 0) {
			if (flag == true) {
				break;
			} else {
				flag = true;
			}
		} else {
			flag = false;
			for (let y = 0; y < this.rows; y++) {
				this.path.push([col, y]);
			}
		}
		// change step
		if (step < 0) {
			step = -(step - 1);
		} else {
			step = -(step + 1);
		}
	}
}

Path.prototype.get_rep = function() {
	return this.path;
}

function Allocator() {
	this.grid = null;
	this.grid2 = null;
	this.booths = null;
	this.num_booths = 0;
	this.allocation = {};
	this.f_allocation = {};
	this.cols = 0;
	this.rows = 0;
	this.cols2 = 0;
	this.rows2 = 0;
}

Allocator.prototype.roundNum = function(num) {
	return Math.round((num + Number.EPSILON) * 100) / 100;
}

Allocator.prototype.load_grid = function(level, string) {
	let grid = [];
	for (let line of string.split("\n")) {
		let row = []
		for (let cell of line.split(",")) {
			row.push(+cell);
		}
		grid.push(row);
	}
	if (level == 1) {
		this.grid = [];
		for (let row of grid) {
			this.grid.push(row);
		}
		this.cols = this.grid[0].length;
		this.rows = this.grid.length;
	} else {
		this.grid2 = []
		for (let row of grid) {
			this.grid2.push(row);
		}
		this.cols2 = this.grid2[0].length;
		this.rows2 = this.grid2.length;
	}
}

Allocator.prototype.load_booths_obj = function(json_arr) {
	this.booths = {};
	for (let obj of json_arr) {
		// id groupName prototype category width breadth
		const id = obj["id"];
		const groupName = obj["groupName"];
		const category = obj["category"];
		const width = obj["width"];
		const height = obj["height"];

		this.booths[id] = new Booth(id, groupName, category, Math.round(width * 2), Math.round(height * 2));
		this.num_booths++;
	}
}

Allocator.prototype.space_free = function(level, posX, posY, dimX, dimY) {
	for (let dx = 0; dx < dimX; dx++) {
		for (let dy = 0; dy < dimY; dy++){
			let x = posX + dx;
			let y = posY + dy;
			if (level == 1) {
				if ((x < this.cols && y < this.rows && this.grid[y][x] != 0) || (x >= this.cols || y >= this.rows)) {
					return false;
				}
			} else {
				if ((x < this.cols2 && y < this.rows2 && this.grid2[y][x] != 0) || (x >= this.cols2 || y >= this.rows2)) {
					return false;
				}
			}
		}
	}
	return true;
}

Allocator.prototype.assign_booth = function(level, booth, posX, posY) {
	this.allocation[booth.proj_id] = [posX, posY, level];
	for (let dx = 0; dx < booth.dimX; dx++) {
		for (let dy = 0; dy < booth.dimY; dy++) {
			let x = posX + dx;
			let y = posY + dy;
			if (level == 1) {
				this.grid[y][x] = booth.proj_id;
			} else {
				this.grid2[y][x] = booth.proj_id;
			}
		}
	}
}

Allocator.prototype.allocate = function(percent) {
    let p = new Path(this.rows, this.cols);
    p.build_path_spiralout(63, 80, 0, 1);

	let p2 = new Path(this.rows2, this.cols2);
	p2.build_path_verticalout(66);

	let sep_by_cat = {};
	let cat_index = {};

	for (let booth_id in this.booths) {
		let booth = this.booths[booth_id];
		let cat = booth.proj_type;

		if (sep_by_cat.hasOwnProperty(cat)) {
			sep_by_cat[cat].push(booth_id);
		} else {
			sep_by_cat[cat] = [booth_id];
			cat_index[cat] = 0;
		}
	}

	for (let cat in sep_by_cat) {
		sep_by_cat[cat].sort((a, b) => {
			return this.booths[b].dim() - this.booths[a].dim();
		});
	}

	// console.log(sep_by_cat);
	// console.log(this.booths);

	let booth_order = [];
	let last_cat = -1;
	while (booth_order.length < this.num_booths) {
		let msf = -1;
		let msc = -1;
		for (let cat in sep_by_cat) {
			if (last_cat != cat && cat_index[cat] < sep_by_cat[cat].length) {
				const contestant = sep_by_cat[cat][cat_index[cat]];
				if ((msf == -1 || this.booths[msf].dim() < this.booths[contestant].dim())) {
					msf = contestant;
					msc = cat;
				}
			}
		}
		if (msf == -1) {
			// the only remaining booths are in the last category
			for (let i = cat_index[last_cat]; i < sep_by_cat[last_cat].length; i++) {
				booth_order.push(sep_by_cat[last_cat][i]);
			}
		} else {
			booth_order.push(msf);
			last_cat = msc;
			cat_index[msc]++;
		}
	}

	// console.log(booth_order.length);
	// for (let bid of booth_order) {
	// 	console.log(bid, this.booths[bid].proj_type, this.booths[bid].dim());
	// }

	// over here is where you arrange the booths
	// 1. split booths into the various categories (1 - max(category))
	// 2. for each category sort booths according to size (width * height) (largest first, followed by smallest)
	// 3. choose an arbitrary amount (say 60% of all booths to be fit in level 1)
	// 4. spiral out from level one picking booths form alternating categories until the limit has been reached
	// 5. the remaining booths on level 2 should be the smaller booths, so just repeat step 4

	let l1_cnt = 0;
	let l1_booths = Math.floor(percent / 100 * this.num_booths);

	for (let booth_id of booth_order) {
		let booth = this.booths[booth_id];
		let found = false;
		let level;
		let ptf;
		if (l1_cnt < l1_booths) {
			level = 1;
			ptf = p;
		} else {
			level = 2;
			ptf = p2;
		}
		for (let loc of ptf.get_rep()) {
			let i = loc[0];
			let j = loc[1];

			if (this.space_free(level, i, j, booth.dimX + 2, booth.dimY + 2)) {
				this.assign_booth(level, booth, i + 1, j + 1);
				found = true;
				break;
			} else if (this.space_free(level, i, j, booth.dimY + 2, booth.dimX + 2)) {
				booth.flip_dim();
				this.assign_booth(level, booth, i + 1, j + 1);
				found = true;
				break;
			}
		}
		if (!found) {
			this.allocation[booth.proj_id] = [-1, -1, level];
			console.log("not found for booth " + booth.proj_id + " on level " + level);
		} else {
			if (level == 1) l1_cnt++;
			// console.log("allocated booth " + booth.proj_id + " to level " + level);
		}
	}

	// console.log(this.num_booths)
	//
	// console.log(this.rows, this.cols);
	// console.log(this.rows2, this.cols2);
	//
	// const b = this.allocation["s04"];
	// console.log(b, this.booths["s04"]);

	const L1BB_WIDTH = 611;
	const L1BB_HEIGHT = 640;
	const L1_OFFX = 86.57;
	const L1_OFFY = 16.75;

	const L2BB_WIDTH = 913;
	const L2BB_HEIGHT = 524;
	const L2_OFFX = 36.03;
	const L2_OFFY = 258.25;

	const IM_WIDTH = 1191;
	const IM_HEIGHT = 1684;
	const ACTUAL_WIDTH = 298;
	const ACTUAL_HEIGHT = 421;

	for (let bid in this.allocation) {
		const level = this.allocation[bid][2];
		const ix = this.allocation[bid][0];
		const iy = this.allocation[bid][1];
		const iw = this.booths[bid]["dimX"];
		const ih = this.booths[bid]["dimY"];

		if (level == 1) {
			const x = L1BB_WIDTH/this.cols * ix;
			const y = L1BB_HEIGHT/this.rows * iy;
			const w = L1BB_WIDTH/this.cols * iw;
			const h = L1BB_HEIGHT/this.rows * ih;

			const imx = x/IM_WIDTH * ACTUAL_WIDTH;
			const imy = y/IM_HEIGHT * ACTUAL_HEIGHT;
			const imw = w/IM_WIDTH * ACTUAL_WIDTH;
			const imh = h/IM_HEIGHT * ACTUAL_HEIGHT;

			const a = this.roundNum(L1_OFFX + imx);
			const b = this.roundNum(L1_OFFY + imy);
			const c = this.roundNum(imw);
			const d = this.roundNum(imh);

			this.f_allocation[bid] = [a, b, c, d];
		} else {
			const x = L2BB_WIDTH/this.cols2 * ix;
			const y = L2BB_HEIGHT/this.rows2 * iy;
			const w = L2BB_WIDTH/this.cols2 * iw;
			const h = L2BB_HEIGHT/this.rows2 * ih;

			const imx = x/IM_WIDTH * ACTUAL_WIDTH;
			const imy = y/IM_HEIGHT * ACTUAL_HEIGHT;
			const imw = w/IM_WIDTH * ACTUAL_WIDTH;
			const imh = h/IM_HEIGHT * ACTUAL_HEIGHT;

			const a = this.roundNum(L2_OFFX + imx);
			const b = this.roundNum(L2_OFFY + imy);
			const c = this.roundNum(imw);
			const d = this.roundNum(imh);

			this.f_allocation[bid] = [a, b, c, d];
		}
	}

	console.log(this.rows, this.cols);
	console.log(this.rows2, this.cols2);

	// const x = 611/130 * 64;
	// const y = 640/134 * 81;
	// const w = 611/130 * 23;
	// const h = 640/134 * 14;
	//
	// const imx = x/1191 * 298;
	// const imy = y/1684 * 421;
	// const imw = w/1191 * 298;
	// const imh = h/1684 * 421;
	//
	// const offx = 86.57;
	// const offy = 16.75;
	// console.log(offx + imx, offy + imy, offx + imx + imw, offy + imy + imh);
	// console.log(this.f_allocation);
}

exports.Allocator = Allocator;
exports.Path = Path;
