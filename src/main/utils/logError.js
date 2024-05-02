const fs = require('fs');

const logError = (errorMessage) => {
    const logMessage = `${new Date().toISOString()} - ${errorMessage}\n`;
    fs.appendFile('./logs/error.log', logMessage, (err) => {
      if (err) {
        console.error('Error writing to error.log:', err);
      }
    });
  }

  module.exports = logError;
