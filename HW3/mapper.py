import sys 

for line in sys.stdin:
    # remove the spaces
    line = line.strip()
    # split the log with ' '
    words = line.split(' ')
    # split out the 'date/month/year hour' format
    datehour = words[3].split(':')
    # print the key-value pair
    datehour = datehour[0][1:] + '-' + datehour[1] + ":00:00"  # 12/Mar/2004-12:00:00
    print "%s %s" % (datehour, 1)
