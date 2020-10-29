import sys 

#que = []
for line in sys.stdin:
    line = line.strip()
    words = line.split(' ')
    datehour = words[3].split(':')
    datehour = datehour[0][1:] + '-' + datehour[1] + ":00:00"  # 12/Mar/2004-12:00:00
    # que.append( (datehour, 1) )
    print "%s %s" % (datehour, 1)
#print(que)
