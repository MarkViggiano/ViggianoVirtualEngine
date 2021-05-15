from vveState import VveState
from commands.commandImporter import *
import platform
import os
import sys
import ctypes

class Vve:
    def __init__(self):
        self.state : VveState = VveState.COMMAND
        self.logs = []
        self.commands = []

    def start(self):
        self.clearField()
        ctypes.windll.kernel32.SetConsoleTitleW("VVE - Viggiano Virtual Engine")
        print("==================")
        print("Starting VVE...")
        print("OS: {0}".format(platform.platform()))
        print("==================")
        print("VVE started!")
        self.registerCommands()
        self.handleCommands()

    def registerCommands(self):
        self.commands.append(ExitCommand())
        self.commands.append(SystemCommand())
        self.commands.append(NotifyCommand())
        self.commands.append(ClearCommand(self))
        self.commands.append(LogCommand(self))
        self.commands.append(HelpCommand(self))
        self.commands.append(CmdCommand())
        return

    def clearField(self):
        system = platform.platform()
        if "windows" in system.lower():
            os.system('clear') #for shell prompt
            os.system('cls')

        if "linux" in system.lower():
            os.system('clear')

    def getState(self):
        return self.state

    def setState(self, state : VveState):
        self.state = state

    def handleCommands(self):
        command = input()
        if (self.getState() == VveState.COMMAND):
            self.processCommand(command)
            return

        if (self.getState() == VveState.PY):
            print(eval(command))
            return

        if (self.getState() == VveState.JS):
            # TODO: make it exeucte js or remove the js feature
            print(ctx.eval(command))
            return

    def logAction(self, action):
        self.logs.append(action)

    def processCommand(self, commandName : str):
        commandInput = list(commandName.split(" "))
        name = commandInput[0]
        commandArgs = commandInput[1:]
        commands = self.commands
        executed = False
        for command in commands:
            if command.getName().lower() == name.lower():
                self.logAction("Command: {0} has been executed by the user! Arguments are: {1}".format(name, commandArgs))
                command.execute(commandArgs)
                executed = True
                break

        if not executed:
            print("Command not found... :(")
        self.handleCommands()

vve = Vve()
vve.start()
