from commands.baseCommand import Command
import sys

class ExitCommand(Command):
    def __init__(self):
        super().__init__("exit")

    def execute(self, *args):
        print("Exiting...")
        sys.exit()
