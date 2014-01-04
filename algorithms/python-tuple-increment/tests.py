import unittest
from increment import tuple_increment, next_single_digit

class DigitWrapTestCase(unittest.TestCase):
	def test_works(self):
		self.assertEqual(2, next_single_digit(1))
		self.assertEqual(1, next_single_digit(0))
		self.assertEqual(0, next_single_digit(9))

class TupleIncrementTestCase(unittest.TestCase):
	def _assert_increment_works(self, input_tuple, expected_output):
		self.assertEqual(tuple_increment(input_tuple), expected_output)

	def test_works(self):
		self._assert_increment_works((1,), (2,))
		self._assert_increment_works((1,2,3,4), (1,2,3,5))
		self._assert_increment_works((8, 0, 0), (8, 0, 1))

	def test_edge_cases(self):
		self._assert_increment_works((0,), (1,))
		self._assert_increment_works((9, 9, 9), (1, 0, 0, 0))
		self._assert_increment_works((9, 8, 9), (9, 9, 0))
		self._assert_increment_works((1, 0, 0, 0, 0, 0, 0, 0), (1, 0, 0, 0, 0, 0, 0, 1))

if __name__ == '__main__':
	unittest.main()