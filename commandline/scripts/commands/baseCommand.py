from abc import ABC, abstractmethod

class Command(ABC):
    def __init__(this, name):
        this.name = name

    def getName(this):
        return this.name

    def execute(this, *args):
        pass
