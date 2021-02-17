from commands.baseCommand import Command
import platform
import os

class ClearCommand(Command):
    def __init__(self, vve):
        super().__init__("clear")
        self.vve = vve

    def execute(self, *args):
        self.vve.clearField()
        print("==================")
        print("Starting VVE...")
        print("OS: {0}".format(platform.platform()))
        print("==================")
        print("VVE started!")
