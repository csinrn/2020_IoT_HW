import sys

num = 0
lastkey = ''
for keypair in sys.stdin:
    # split the key-value pair
    key, val = keypair.split(' ')
    # count the sorted logs
    if key != lastkey:
        if lastkey != '':
            # output
            print "%s    %s" % (key, num)
        lastkey = key
        num = 1
    else:
        num = num+1