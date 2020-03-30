import random, string

def valid_grid(row, col):
	return [[random.randint(0, 1) for i in range(col)] for j in range(row)]

def invalid_shape_grid(row, col, adds):
	return [[random.randint(0, 1) for i in range(col + random.choice(adds))] for j in range(row)]

def invalid_value_grid(row, col, times):
	grid = [[random.randint(0, 1) for i in range(col)] for j in range(row)]
	for i in range(times):
		grid[random.randint(0, row - 1)][random.randint(0, col - 1)] = 2
	return grid

def invalid_shape_value_grid(row, col, adds, times):
	grid = [[random.randint(0, 1) for i in range(col + random.choice(adds))] for j in range(row)]
	for i in range(times):
		grid[random.randint(0, row - 1)][random.randint(0, col - 1)] = 2
	return grid

def generate_grids(N = 10, row_range = [50, 200], col_range = [50, 200], valid = 0.25, shape_invalid = 0.5, adds = [-3, -2, -1, 0, 1, 2, 3], value_invalid = 0.75, times = 1, fprefix = "test_grid_"):
	# generate N grids, with chances of generating invalid grids
	for i in range(N):
		rows = random.randint(*row_range)
		cols = random.randint(*col_range)
		chance = random.random()
		if chance < valid:
			# generate a valid grid
			grid = valid_grid(rows, cols)
			fname = "v_" + fprefix + str(i) + ".csv"
		else:
			if chance < shape_invalid:
				# generate an invalid shape grid
				grid = invalid_shape_grid(rows, cols, adds)
				fname = "i_" + fprefix + "s_" + str(i) + ".csv"
			elif chance < value_invalid:
				# generate an invalid value grid
				grid = invalid_value_grid(rows, cols, times)
				fname = "i_" + fprefix + "v_" + str(i) + ".csv"
			else:
				# generate an invalid shape and value grid
				grid = invalid_shape_value_grid(rows, cols, adds, times)
				fname = "i_" + fprefix + "sv_" + str(i) + ".csv"
		with open(fname, "w") as f:
			for row in grid:
				f.write(",".join(str(c) for c in row))
				f.write("\n")

def valid_booths(n, wr, hr, nl, tl):
	booths = []
	for i in range(n):
		w = random.randint(*wr)
		h = random.randint(*hr)
		name = ''.join(random.choice(string.ascii_lowercase) for i in range(nl))
		ptype = ''.join(random.choice(string.ascii_lowercase) for i in range(tl))
		booths.append([str(i), name, ptype, w/2, h/2])
	return booths


def invalid_ids_booths(n, wr, hr, nl, tl, itimes):
	booths = []
	for i in range(n):
		w = random.randint(*wr)
		h = random.randint(*hr)
		name = ''.join(random.choice(string.ascii_lowercase) for i in range(nl))
		ptype = ''.join(random.choice(string.ascii_lowercase) for i in range(tl))
		booths.append([str(i), name, ptype, w/2, h/2])
	for i in range(itimes):
		booths[random.randint(1, n - 1)][0] = booths[0][0]
	return booths


def invalid_dims_booths(n, wr, hr, nl, tl, dtimes):
	booths = []
	for i in range(n):
		w = random.randint(*wr)
		h = random.randint(*hr)
		name = ''.join(random.choice(string.ascii_lowercase) for i in range(nl))
		ptype = ''.join(random.choice(string.ascii_lowercase) for i in range(tl))
		booths.append([str(i), name, ptype, w/2, h/2])
	for i in range(dtimes):
		booths[random.randint(0, n - 1)][random.randint(3, 4)] = random.choice(['a', -1])
	return booths


def invalid_format_booths(n, wr, hr, nl, tl, ftimes):
	booths = []
	for i in range(n):
		w = random.randint(*wr)
		h = random.randint(*hr)
		name = ''.join(random.choice(string.ascii_lowercase) for i in range(nl))
		ptype = ''.join(random.choice(string.ascii_lowercase) for i in range(tl))
		booths.append([str(i), name, ptype, w/2, h/2])
	for i in range(ftimes):
		booths[random.randint(0, n - 1)].append(0)
	return booths

def invalid_all_booths(n, wr, hr, nl, tl, itimes, dtimes, ftimes):
	booths = []
	for i in range(n):
		w = random.randint(*wr)
		h = random.randint(*hr)
		name = ''.join(random.choice(string.ascii_lowercase) for i in range(nl))
		ptype = ''.join(random.choice(string.ascii_lowercase) for i in range(tl))
		booths.append([str(i), name, ptype, w/2, h/2])
	for i in range(itimes):
		booths[random.randint(1, n - 1)][0] = booths[0][0]
	for i in range(dtimes):
		booths[random.randint(0, n - 1)][random.randint(3, 4)] = random.choice(['a', -1])
	for i in range(ftimes):
		booths[random.randint(0, n - 1)].append(0)

	return booths

def generate_booths(N = 10, num_booths_range = [10, 100], name_len = 100, type_len = 50, width_range = [2, 24], height_range = [2, 24], valid = 0.2, invalid_ids = 0.4, invalid_dims = 0.6, invalid_format = 0.8, itimes = 1, dtimes = 1, ftimes = 1, fprefix = "test_booths_"):
	for i in range(N):
		nbooths = random.randint(*num_booths_range)
		chance = random.random()
		if chance < valid:
			booths = valid_booths(nbooths, width_range, height_range, name_len, type_len)
			fname = "v_" + fprefix + str(i) + ".csv"
		else:
			if chance < invalid_ids:
				booths = invalid_ids_booths(nbooths, width_range, height_range, name_len, type_len, itimes)
				fname = "i_" + fprefix + "i_" + str(i) + ".csv"
			elif chance < invalid_dims:
				booths = invalid_dims_booths(nbooths, width_range, height_range, name_len, type_len, dtimes)
				fname = "i_" + fprefix + "d_" + str(i) + ".csv"
			elif chance < invalid_format:
				booths = invalid_format_booths(nbooths, width_range, height_range, name_len, type_len, ftimes)
				fname = "i_" + fprefix + "f_" + str(i) + ".csv"
			else:
				booths = invalid_all_booths(nbooths, width_range, height_range, name_len, type_len, itimes, dtimes, ftimes)
				fname = "i_" + fprefix + "a_" + str(i) + ".csv"

		with open(fname, "w") as f:
			for row in booths:
				f.write(",".join(str(c) for c in row))
				f.write("\n")



if __name__ == "__main__":
	generate_grids(100)
	generate_booths(100)