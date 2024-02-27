const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("throws error if a name is NOT passed into the constructor as the first parameter", () => {
        expect( function() { new Message();}).toThrow(new Error('Message name required.'));
    });

    it("constructor sets name", () => {
        expect(new Message("testname").name).toBe("testname");
        expect(new Message("nametest").name).toBe("nametest");
    });

    it("contains a commands array passed into the constructor as the 2nd argument", () => {
        let testCommands = [new Command("MODE_CHANGE", "LOW_POWER"), new Command("MOVE", 12000)];
        expect(new Message("test", testCommands).commands).toEqual(testCommands);
    })
});
