def tuple_increment(tup):
	"""Given a tuple where each element is a single digit number, we can think
	of the entire tuple as a number itself, with the elements its digits. We
	return another tuple, which represents the original number incremented by
	one."""
	carry = True
	position = len(tup) - 1
	new_list = list(tup)

	while carry:
		if position < 0:
			return (1,) + tuple(0 for _ in range(len(tup)))
		if tup[position] != 9:
			carry = False
		new_list[position] = next_single_digit(tup[position])
		position -= 1
	return tuple(new_list)

def next_single_digit(digit):
	"""Given a digit in [0, 9], return the next single digit"""
	return (digit + 1) % 10