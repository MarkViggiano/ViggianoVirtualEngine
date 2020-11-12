from commands.baseCommand import Command
import sys

class ExitCommand(Command):
    def __init__(this):
        super().__init__("exit")

    def execute(this):
        print("Exiting...")
        sys.exit()
