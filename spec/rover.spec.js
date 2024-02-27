const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  it("constructor sets position and default values for mode and generatorWatts", () => {
    expect(new Rover(67)).toEqual({position: 67, mode: "NORMAL", generatorWatts: 110});
  });

  it("response returned by receiveMessage contains the name of the message", () => {
    let testMessage = new Message("This is a test message.", [new Command("MOVE", 12000)]);
    expect(new Rover(100).receiveMessage(testMessage).message).toBe("This is a test message.");
  });

  it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
    let testCommands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 12000)];
    let testMessage = new Message("This is a test message.", testCommands);
    expect(new Rover(100).receiveMessage(testMessage).results.length).toBe(2);
  });

  it("responds correctly to the status check command", () => {
    let testMessage = new Message("Status Check", [new Command("STATUS_CHECK")])
    let expectedResult = {completed: true, roverStatus: {mode: "NORMAL", generatorWatts: 110, position: 150}};

    expect(new Rover(150).receiveMessage(testMessage).results[0]).toEqual(expectedResult);
  });

  it("responds correctly to the mode change command", () => {
    let testMessage = new Message("Switch to low power mode.", [new Command("MODE_CHANGE", "LOW_POWER")]);
    let rover = new Rover(100);

    expect(rover.receiveMessage(testMessage).results[0]).toEqual({completed: true});
    expect(rover.mode).toBe("LOW_POWER");
  });

  it("responds with a false completed value when attempting to move in LOW_POWER mode", () => {
    let rover = new Rover(1127);

    let lowPowerCommand = new Command("MODE_CHANGE", "LOW_POWER");
    let moveCommand = new Command("MOVE", 200);

    let testMessage = new Message("Test Message", [lowPowerCommand, moveCommand]);

    expect(rover.receiveMessage(testMessage).results[1]).toEqual({completed: false});
    expect(rover.position).toEqual(1127);
  });

  it("responds with the position for the move command", () => {
    let rover = new Rover(1127);
    let moveMessage = new Message("Move to 1500.", [new Command("MOVE", 1500)]);
    expect(rover.receiveMessage(moveMessage).results[0]).toEqual({completed: true});
    expect(rover.position).toEqual(1500);
  })
});
