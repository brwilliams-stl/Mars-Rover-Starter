class Rover {
   constructor(position) {
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let recieved = {
         message: message.name,
         results: []
      };

      for (let i of message.commands) {
         if (i.commandType == "STATUS_CHECK") {
            recieved.results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         } else if (i.commandType == "MODE_CHANGE") {
            this.mode = i.value;
            recieved.results.push({completed: true});
         } else if (i.commandType == "MOVE") {
            if (this.mode == "LOW_POWER") {
               recieved.results.push({completed: false});
            } else {
               this.position = i.value;
               recieved.results.push({completed: true});
            }
         }
      }

      return recieved;
   }
}

module.exports = Rover;