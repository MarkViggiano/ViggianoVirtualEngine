from commands.baseCommand import Command
import os

class CmdCommand(Command):
    def __init__(self):
        super().__init__("cmd")

    def execute(self, *args):
        message = ""
        for arg in args[0]:
            message += "{0} ".format(arg)

        os.system(message)
