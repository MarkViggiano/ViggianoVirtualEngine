from commands.baseCommand import Command
import sys

class HelpCommand(Command):
    def __init__(self, vve):
        super().__init__("help")
        self.vve = vve

    def execute(self, *args):
        commandNames = []
        for command in self.vve.commands:
            commandNames.append(command.getName())

        print('--------------')
        for commandName in commandNames:
            print("- {0}".format(commandName))
        print('--------------')
