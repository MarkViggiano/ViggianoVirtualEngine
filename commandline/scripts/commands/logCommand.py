from commands.baseCommand import Command

class LogCommand(Command):
    def __init__(self, vve):
        super().__init__("showlogs")
        self.vve = vve

    def execute(self, *args):
        print("==================")
        print("Logs:")
        print("------------------")
        for log in self.vve.logs:
            print(log)

        print("==================")
