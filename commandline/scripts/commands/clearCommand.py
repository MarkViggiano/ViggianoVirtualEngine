from commands.baseCommand import Command
import platform
import os

class ClearCommand(Command):
    def __init__(this, vve):
        super().__init__("clear")
        this.vve = vve

    def execute(this):
        this.vve.clearField()
        print("==================")
        print("Starting VVE...")
        print("OS: {0}".format(platform.platform()))
        print("==================")
        print("VVE started!")
