from commands.baseCommand import Command

class LogCommand(Command):
    def __init__(this, vve):
        super().__init__("showlogs")
        this.vve = vve

    def execute(this, *args):
        print("==================")
        print("Logs:")
        print("------------------")
        for log in this.vve.logs:
            print(log)

        print("==================")
