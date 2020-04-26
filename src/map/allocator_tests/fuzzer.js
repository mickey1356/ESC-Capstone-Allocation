function Fuzzer() {
}

Fuzzer.prototype.random = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


Fuzzer.prototype.generate_dimensions = function(min_width, min_height, max_width, max_height) {
    return [this.random(min_width, max_width), this.random(min_height, max_height)];
}

Fuzzer.prototype.generate_booth = function(min_width, min_height, max_width, max_height, length) {
    let width = this.random(min_width, max_width);
    let height = this.random(min_height, max_height);
    let id = String.fromCharCode(this.random(48, 123), this.random(48, 123), this.random(48, 123));
    let name = "";
    for (let i = 0; i < length; i++) {
        name += String.fromCharCode(this.random(48, 123));
    }
    let category = this.random(0, 7);
    return {"id":id, "groupName":name, "category":category, "width":width, "height":height};
}

Fuzzer.prototype.generate_booths_json = function(count, min_width, min_height, max_width, max_height, length) {
    let objs = [];
    for (let i = 0; i < count; i++) {
        let obj = this.generate_booth(min_width, min_height, max_width, max_height, length);
        objs.push(obj);
    }
    return objs;
}

Fuzzer.prototype.generate_empty_grids = function(count, min_width, min_height, max_width, max_height) {
    let objs = [];
    for (let i = 0; i < count; i++) {
        let w = this.random(min_width, max_width);
        let h = this.random(min_height, max_height);
        let level = this.random(1, 3);
        objs.push([level, this.generate_empty_grid(w, h), w, h]);
    }
    return objs;
}

Fuzzer.prototype.generate_empty_grid = function(width, height) {
    let s = "";
    for (let row = 0; row < height; row++) {
        let line = [];
        for (let col = 0; col < width; col++) {
            line.push("0");
        }
        s += line.join(",") + "\n";
    }
    return s.trim();
}

Fuzzer.prototype.generate_filled_grid = function(width, height) {
    let s = "";
    for (let row = 0; row < height; row++) {
        let line = [];
        for (let col = 0; col < width; col++) {
            line.push("1");
        }
        s += line.join(",") + "\n";
    }
    return s.trim();
}

Fuzzer.prototype.generate_singly_filled_grid = function(width, height) {
    let s = "";
    for (let row = 0; row < height; row++) {
        let line = [];
        for (let col = 0; col < width; col++) {
            if (col == Math.floor(width/2) && row == Math.floor(height/2)) {
                line.push("1");
            } else {
                line.push("0");
            }
        }
        s += line.join(",") + "\n";
    }
    return s.trim();
}

Fuzzer.prototype.generate_random_grids = function(count, min_width, min_height, max_width, max_height) {
    let objs = [];
    for (let i = 0; i < count; i++) {
        let type = this.random(0, 3);
        let level = this.random(1, 3);
        let w = this.random(min_width, max_width);
        let h = this.random(min_height, max_height);
        if (type == 0) {
            objs.push([level, this.generate_empty_grid(w, h), [type, w, h]]);
        } else if (type == 1) {
            objs.push([level, this.generate_filled_grid(w, h), [type, w, h]]);
        } else {
            let i = this.random(0, w);
            let j = this.random(0, h);
            objs.push([level, this.generate_singly_filled_grid(w, h), [type, w, h]]);
        }
    }
    return objs;
}

exports.Fuzzer = Fuzzer;
