#From the error log file, use Python regular expressions to extract the IP addresses. Then use Python to write the IP addresses to a text file. The addresses should be listed in a column.
#By the way, there was some confusion about the error log file in the previous class.  You don't need to use Python code to download the file.  Just download it via normal OS procedures.


import re
import os


with open ('error_log.txt') as f:
    data = f.read()


with open('ipaddresses.txt','w') as newf:
    for i in (re.findall(r"[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}", data)):
        newf.write(f'{i}\n')

os.startfile('ipaddresses.txt')





