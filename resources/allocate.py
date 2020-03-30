import random, copy
import numpy as np
import matplotlib.pyplot as plt

# constants
BLACK = [0, 0, 0]
WHITE = [255, 255, 255]

SIZE_SCALE = 2

class Booth:
	def __init__(self, proj_id, name, proj_type, dims, color = None):
		self.proj_id = proj_id
		self.name = name
		self.proj_type = proj_type
		self.dims = dims
		if color:
			self.color = color
		else:
			self.color = [random.randint(0, 255) for i in range(3)]

	def get_id(self):
		return self.proj_id

	def get_dims(self):
		return self.dims

	def get_color(self):
		return self.color

	def __str__(self):
		return self.proj_id + ": (" + str(self.dims[0]) + ", " + str(self.dims[1]) + ")"

	def __hash__(self):
		return hash(self.proj_id)

class Allocator:
	def __init__(self, space_file, booths_file, scale):
		self.space_file = space_file
		self.booths_file = booths_file
		self.scale = scale
		self.grid = None
		self.booths = None
		self.allocation = {}
		self.cols = 0
		self.rows = 0

	def load_grid(self):
		self.grid = []
		with open(self.space_file, "r") as f:
			for line in f.readlines():
				self.grid.append(list(map(int, line.split(","))))

		assert all(len(l) == len(self.grid[0]) for l in self.grid), "Space must be rectangular"
		assert all(sqr in [0, 1] for row in self.grid for sqr in row), "Space must only contain 0 or 1"
		self.cols = len(self.grid[0])
		self.rows = len(self.grid)

	def load_booths(self):
		self.booths = {}

		with open(self.booths_file, "r") as f:
			for line in f.readlines():
				# booths shall be stored in the following format id, name, type, width, height
				proj_id, name, proj_type, width, height = line.split(",")

				assert float(width) > 0 and float(height) > 0, "Dimensions must be positive numbers"
				# ensure that each proj_id is unique
				assert proj_id not in self.booths, "ID needs to be unique to each booth/project"

				self.booths[proj_id] = Booth(proj_id, name, proj_type, (int(float(width) * SIZE_SCALE) , int(float(height) * SIZE_SCALE)))

	def load_grid_db(self):
		pass

	def load_booths_db(self):
		pass

	def get_dims(self):
		assert self.grid is not None, "Need to call load_grid() first"
		return (self.rows, self.cols)

	def get_grid(self):
		assert self.grid is not None, "Need to call load_grid() first"
		return self.grid

	def space_free(self, pos, dims):
		assert self.grid is not None, "Need to call load_grid() first"

		for dx in range(dims[0]):
			for dy in range(dims[1]):
				x = pos[0] + dx
				y = pos[1] + dy
				if (x < self.cols and y < self.rows and self.grid[y][x] != 0) or (x >= self.cols or y >= self.rows):
					return False
		return True

	def assign_booth(self, booth, pos):
		assert self.grid is not None, "Need to call load_grid() first"
		assert self.space_free(pos, booth.get_dims()), "Booth cannot fit within the space"

		self.allocation[booth] = pos
		for dx in range(booth.get_dims()[0]):
			for dy in range(booth.get_dims()[1]):
				x = pos[0] + dx
				y = pos[1] + dy
				self.grid[y][x] = booth.get_id()

	def greedy_allocate(self, path):
		assert self.grid is not None, "Need to call load_grid() first"
		assert self.booths is not None, "Need to call load_booths() first"
		assert path is not None, "Provide a valid path"

		# greedy algo from top left to btm right
		for proj_id, booth in self.booths.items():
			found = False
			for (i, j) in path:
				# offset the positions to leave a 0.5m border
				if self.space_free((i, j), (booth.get_dims()[0]+2, booth.get_dims()[1]+2)):
					self.assign_booth(booth, (i+1,j+1))
					found = True
					break
				if found:
					break
			if not found:
				print("not found for booth", proj_id)

	# opens a numpy window that shows the space
	def display(self):
		assert self.grid is not None, "Need to call load_grid() first"
		assert self.booths is not None, "Need to call load_booths() first"

		im = [[0 for j in range(self.cols)] for i in range(self.rows)]
		for i, row in enumerate(self.grid):
			for j, sqr in enumerate(row):
				# empty sqr
				if sqr == 0:
					im[i][j] = WHITE
				elif sqr == 1:
					im[i][j] = BLACK
				else:
					im[i][j] = self.booths[sqr].get_color()
		plt.imshow(im)
		plt.show()

class Path:
	def __init__(self, rows, cols):
		self.rows = rows
		self.cols = cols
		self.path = None

	def __next_dir(self, d):
		if d == (0, 1): # down
			return (-1, 0)
		elif d == (-1, 0): # left 
			return (0, -1)
		elif d == (0, -1): # up
			return (1, 0)
		elif d == (1, 0): # right
			return (0, 1)
		else:
			assert False, "Invalid direction specified"

	def build_path_tlbr(self):
		self.path = []
		for y in range(self.rows):
			for x in range(self.cols):
				self.path.append((x, y))

	def build_path_spiralout(self, inx, iny, direction = (0, 1)):
		assert 0 <= inx < self.cols, "Initial x position needs to be within the grid"
		assert 0 <= iny < self.rows, "Initial y position needs to be within the grid"

		self.path = [(inx, iny)]
		
		# (dx, dy)
		d = direction
		cx = inx
		cy = iny
		# forward 1, turn, forward 1, turn => forward n+1, turn forward n+1, turn
		steps = 1
		while len(self.path) < self.rows * self.cols:
			for i in range(2):
				for diff in range(steps):
					x = (diff + 1) * d[0] + cx
					y = (diff + 1) * d[1] + cy
					if 0 <= x < self.cols and 0 <= y < self.rows:
						self.path.append((x, y))
				cx += steps * d[0]
				cy += steps * d[1]
				d = self.__next_dir(d)
			steps += 1

	def get_rep(self):
		assert self.path is not None, "Need to build a path first"
		return self.path

	def display(self):
		assert self.path is not None, "Need to build a path first"
		im = [[0 for j in range(self.cols)] for i in range(self.rows)]

		c = 0
		for (x, y) in self.path:
			im[y][x] = [c, c, c]
			c = (c + 1) % 256

		assert all(all(len(sqr) == 3 for sqr in row) for row in im), "Path is not properly defined. It must cover each square once"

		plt.imshow(im)
		plt.show()


class Constraint:
	def __init__(self):
		pass

def main():
	allocator = Allocator("space.csv", "booths.csv", 1)
	allocator.load_grid()
	allocator.load_booths()

	path = Path(*allocator.get_dims())
	# path.build_path_tlbr()
	path.build_path_spiralout(63, 80)

	# path.display()

	allocator.greedy_allocate(path.get_rep())

	allocator.display()

if __name__ == "__main__":
	main()