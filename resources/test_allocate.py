import unittest
import glob

from allocate import Allocator

class AllocateTester(unittest.TestCase):
	pass
	# def test_indiv(self):
	# 	allocator = Allocator(None, "testing/i_test_booths_i_6.csv", 1)
	# 	allocator.load_booths()

def create_fail_grid(grid):
	@unittest.expectedFailure
	def do_test(self):
		allocator = Allocator(grid, None, 1)
		allocator.load_grid()
	return do_test

def create_pass_grid(grid):
	def do_test(self):
		allocator = Allocator(grid, None, 1)
		allocator.load_grid()
	return do_test

def create_fail_booth(booth):
	@unittest.expectedFailure
	def do_test(self):
		allocator = Allocator(None, booth, 1)
		allocator.load_booths()
	return do_test

def create_pass_booth(booth):
	def do_test(self):
		allocator = Allocator(None, booth, 1)
		allocator.load_booths()
	return do_test


if __name__ == "__main__":
	gridtcs = glob.glob("testing/i_test_grid_*.csv")
	for i, tc in enumerate(gridtcs):
		tm = create_fail_grid(tc)
		tm.__name__ = "test_grid_fail_" + str(i)
		setattr(AllocateTester, tm.__name__, tm)

	gridtcs = glob.glob("testing/v_test_grid_*.csv")
	for i, tc in enumerate(gridtcs):
		tm = create_pass_grid(tc)
		tm.__name__ = "test_grid_pass_" + str(i)
		setattr(AllocateTester, tm.__name__, tm)

	boothtcs = glob.glob("testing/i_test_booths_*.csv")
	for i, tc in enumerate(boothtcs):
		tm = create_fail_booth(tc)
		tm.__name__ = "test_booth_fail_" + str(i)
		setattr(AllocateTester, tm.__name__, tm)

	boothtcs = glob.glob("testing/v_test_booths_*.csv")
	for i, tc in enumerate(boothtcs):
		tm = create_pass_booth(tc)
		tm.__name__ = "test_booth_pass_" + str(i)
		setattr(AllocateTester, tm.__name__, tm)



	unittest.main(verbosity = 2, exit = False)