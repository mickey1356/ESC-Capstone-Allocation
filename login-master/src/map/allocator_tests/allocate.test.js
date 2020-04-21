const {Allocator, Path, Booth} = require("../allocate.js");
const {SPACE1, SPACE2} = require("../space.js");
const {Fuzzer} = require("./fuzzer.js");

const fuzzer = new Fuzzer();

const BOOTH_TC_CNT = 10;
const PATH_TC_CNT = 10;
const ALLOCATOR_TC_CNT = 10;

describe("booth tests", () => {
    let booths_to_test = fuzzer.generate_booths_json(BOOTH_TC_CNT, 1, 1, 10, 10, 10);

    let booth_dims = [];
    let booth_flips = [];
    for (let obj of booths_to_test) {
        booth_dims.push([obj, obj["width"] * obj["height"]]);
        booth_flips.push([obj, obj["height"], obj["width"]]);
    }

    test.each(booth_dims)("BoothTest 1-%#: booth calculates overall dimensions", (booth, expected) => {
        let b = new Booth(booth["id"], booth["groupName"], booth["category"], booth["width"], booth["height"]);
        expect(b.dim()).toEqual(expected);
    });

    test.each(booth_flips)("BoothTest 2-%#: booth flips dimensions", (booth, ew, eh) => {
        let b = new Booth(booth["id"], booth["groupName"], booth["category"], booth["width"], booth["height"]);
        b.flip_dim();
        expect(b.dimX).toEqual(ew);
        expect(b.dimY).toEqual(eh);
    });
});

describe("path tests", () => {
    let path_dims = [];
    for (let i = 0; i < PATH_TC_CNT; i++) {
        let dims = fuzzer.generate_dimensions(5, 5, 100, 100);
        path_dims.push([dims[0], dims[1], dims[0] * dims[1]]);
    }

    test.each(path_dims)("PathTest 1-%#: path covers the whole area", (w, h, exp) => {
        let p = new Path(h, w);

        p.build_path_tlbr();
        expect(p.get_rep().length).toEqual(exp);

        p.build_path_spiralout(fuzzer.random(0, w), fuzzer.random(0, h), 1, 0);
        expect(p.get_rep().length).toEqual(exp);

        p.build_path_verticalout(fuzzer.random(0, w));
        expect(p.get_rep().length).toEqual(exp);
    });
});

describe("allocator tests", () => {
    let grids = fuzzer.generate_random_grids(ALLOCATOR_TC_CNT, 5, 5, 200, 200);

    let booth_cnts = [];
    for (let i = 0; i < ALLOCATOR_TC_CNT; i++) {
        let bcnt = fuzzer.random(1, 100);
        let booths = fuzzer.generate_booths_json(bcnt, 1, 1, 10, 10, 10);
        booth_cnts.push([booths, bcnt]);
    }

    let space_free_grids = fuzzer.generate_random_grids(ALLOCATOR_TC_CNT, 5, 5, 20, 20);


    test("AllocatorTest 1-0: allocator gets correct dimensions of SPACE1 and SPACE2", () => {
        let a = new Allocator();

        // initialise allocator and load in grid
        a.load_grid(1, SPACE1);
        a.load_grid(2, SPACE2);

        // check dims read
        expect(a.rows).toEqual(134);
        expect(a.cols).toEqual(130);
        expect(a.rows2).toEqual(81);
        expect(a.cols2).toEqual(124);
    });

    test.each(grids)("AllocatorTest 2-%#: allocator gets correct dimensions of arbitrary grids", (level, string, details) => {
        let a = new Allocator();

        let width = details[1];
        let height = details[2];

        a.load_grid(level, string);
        if (level == 1) {
            expect(a.rows).toEqual(height);
            expect(a.cols).toEqual(width);
            expect(a.grid).not.toBeNull();
        } else if (level == 2) {
            expect(a.rows2).toEqual(height);
            expect(a.cols2).toEqual(width);
            expect(a.grid2).not.toBeNull();
        }
    });

    test.each(booth_cnts)("AllocatorTest 3-%#: allocator gets correct number of booths", (booths, cnt) => {
        let a = new Allocator();
        a.load_booths_obj(booths);
        expect(a.num_booths).toEqual(cnt);
    });

    test.each(space_free_grids)("AllocatorTest 4-%#: space_free works as expected", (level, grid_str, grid_details) => {
        let a = new Allocator();

        let type = grid_details[0]
        let w = grid_details[1];
        let h = grid_details[2];

        a.load_grid(level, grid_str);

        // try to fit a (w-2)x(h-2) booth in the grid
        if (type == 0) {
            expect(a.space_free(level, 1, 1, w - 2, h - 2)).toBe(true);
        } else {
            expect(a.space_free(level, 1, 1, w - 2, h - 2)).toBe(false);
        }
    });


    test("AllocatorTest 5-0: assign_booth assigns booth to the correct grid", () => {
        let a = new Allocator();
        let eg1 = fuzzer.generate_empty_grid(6, 6);
        let eg2 = fuzzer.generate_empty_grid(6, 6);
        a.load_grid(1, eg1);
        a.load_grid(2, eg2);
        let b = fuzzer.generate_booth(4, 4, 5, 5, 10);
        let booth = new Booth(b["id"], b["groupName"], b["category"], b["width"], b["height"]);

        expect(a.space_free(1, 1, 1, booth["width"], booth["height"])).toBe(true);
        expect(a.space_free(2, 1, 1, booth["width"], booth["height"])).toBe(true);

        // a.assign_booth()
    });

    test("allocate returns an obj that covers all the booths", () => {

    });
});
