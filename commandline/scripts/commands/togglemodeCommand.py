from commands.baseCommand import Command

class ToggleCommand(Command):
    def __init__(self):
        super().__init__("mode")

    def execute(self, *args):
        modeName = args[0]
        print(modeName)
