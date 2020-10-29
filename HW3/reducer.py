import sys

num = 0
lastkey = ''
for keypair in sys.stdin:
    key, val = keypair.split(' ')
    if key != lastkey:
        if lastkey != '':
            print "%s    %s" % (key, num)
        lastkey = key
        num = 1
    else:
        num = num+1