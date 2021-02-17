from commands.baseCommand import Command
from plyer import notification as notifier

class NotifyCommand(Command):
    def __init__(self):
        super().__init__("notify")

    def execute(self, *args):
        notifier.notify(
            title="Test Title",
            message="VVE sent me!",
            app_icon=None,
            timeout=10
        )
