import sys 
import os
import platform
import colorama

class Display:
    def __init__(self):
        colorama.init()
        if platform.system() == 'Windows':
            self.CLEAR = 'cls'
        elif (os.name)=='posix':
            self.CLEAR = 'clear'


    def display(self, json):
        # Create a string with a set width of 100 characters
        output = '#' * 128 + '\n'
        output += '# KEY' + (27*' ') + '# VALUE' + (88*' ') + '#\n'
        output += '#' * 128 + '\n'

        # Loop through the JSON fields and format them
        height = 0
        for key, value in json.items():
            output += '#' + (31 * ' ') + '#' + (94*' ') + '#\n'
            height += 1
            k = str(key) + 32*' '
            v = str(value) + 96*' '+'#'
            value_str = str(value)
            l = len(value_str)
            count = 0
            lines = []
            line = ''
            i = 0
            while i < l:
                if len(value_str) > 92 + i:
                    line = value_str[i:i+92]
                    i += 92
                    count+=1
                else: 
                    line = value_str[i:]
                    x =(92-len(line))*' '
                    line += x
                    lines.append(line)
                    count += 1
                    break
                lines.append(line)
            for i in range(count):
                if i == 0:
                    output += '# ' + k[0:30] + '# ' + v[0:93] + '#\n'
                    height += 1
                else:
                    output += '# ' + (' '*30) + '# ' + lines[i] + ' #\n'
                    height += 1


        # Add the closing outline
        output += '#' * 128 + '\n'
        height += 1

        sys.stdout.write('\033[F' * height)

        # Print the formatted JSON
        sys.stdout.write(output)
        sys.stdout.flush()
        return height
    
    def clear(self):
        os.system(self.CLEAR)