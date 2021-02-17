from commands.baseCommand import Command
import psutil

class SystemCommand(Command):
    def __init__(self):
        super().__init__("system")

    def execute(self, *args):
        #memory variables: total, available, percent, used, free
        #divide by 1 billion because 1 gigabit = 1 billion bits, virtual_memory() returns bits
        memory = psutil.virtual_memory()
        totalMemory = memory.total / 1000000000
        usedMemory = memory.used / 1000000000
        availableMemory = memory.available / 1000000000 #available and free memory are the same
        percentUsed = memory.percent

        #cpu
        cpuPercent = psutil.cpu_percent(interval=None) #for non-blocking
        cpuFreq = psutil.cpu_freq(percpu=False).current / 1000 #Faster than calling data for all cores and averaging them. // Divide by 1000 to bring to GHz
        cpuCores = psutil.cpu_count(logical=False) #Logical cores = core count * threads they can run, self is called hyper threading and is typically double the cores
        print("=======================")
        print("\nSystem Stats\n")
        print("-----------------------")
        print("Memory")
        print("-----------------------\n")
        print("Total Memory: {0} GB\nMemory In Use: {1} GB\nAvailable/Free Memory: {2} GB\nPercent Used: {3}%\n".format(totalMemory, usedMemory, availableMemory, percentUsed))
        print("-----------------------")
        print("CPU")
        print("-----------------------\n")
        print("Usage: {0}%\nFrequency: {1} GHz\nUsable Core Count: {2}\n".format(cpuPercent, cpuFreq, cpuCores))
        print("=======================")
