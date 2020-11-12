from commands.baseCommand import Command

class TestCommand(Command):
    def __init__(this):
        super().__init__("test")

    def execute(this):
        print("test command!")
