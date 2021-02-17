from abc import ABC, abstractmethod

class Command(ABC):
    def __init__(self, name):
        self.name = name

    def getName(self):
        return self.name

    def execute(self, *args):
        pass
