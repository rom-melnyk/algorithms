from math import floor

def merge_lists(l1: list, l2: list) -> list:
    result = []
    i1 = i2 = 0
    while i1 < len(l1) or i2 < len(l2):
        if i2 >= len(l2) or (i1 < len(l1) and l1[i1] < l2[i2]):
            result.append(l1[i1])
            i1 += 1
        else:
            result.append(l2[i2])
            i2 += 1
    return result

def merge_sort(l: list) -> list:
    if len(l) == 0:
        return []
    if len(l) == 1:
        return l[:]

    mid = floor(len(l) / 2)
    _left = merge_sort(l[0:mid])
    _right = merge_sort(l[mid:])
    return merge_lists(_left, _right)

# print(merge_lists('cdfx', 'adz'))
print(merge_sort('asdfghjkkkl'))
