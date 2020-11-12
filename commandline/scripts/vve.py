from vveState import VveState
from commands.baseCommand import Command
from commands.commandImporter import *
import platform
import os
import sys

class Vve:
    def __init__(this):
        this.state : VveState = VveState.COMMAND
        this.logs = []
        this.commands = []

    def start(this):
        print("VVE started!")
        this.registerCommands()
        this.handleCommands()

    def registerCommands(this):
        this.commands.append(TestCommand())
        return

    def clearField(this):
        system = platform.platform()
        if "windows" in system.lower():
            os.system('cls')

        if "linux" in system.lower():
            os.system('clear')

    def getState(this):
        return this.state

    def setState(this, state : VveState):
        this.state = state

    def handleCommands(this):
        if (this.getState() == VveState.COMMAND):
            command = input()
            this.processCommand(command)
            return

    def logAction(this, action):
        this.logs.append(action)

    def processCommand(this, commandName : str):
        commands = this.commands
        for command in commands:
            if command.getName().lower() == commandName.lower():
                this.logAction("Command: {0} has been executed by the user!".format(commandName))
                command.execute()
                break

        this.handleCommands()

vve = Vve()
print("==================")
print("Starting VVE...")
print("OS: {0}".format(platform.platform()))
print("==================")
vve.start()
