const { v4: uuidv4 } = require('uuid');

function errorHandler(error, req, res) {
    uuid = uuidv4();
    const message = error.message || 'No message';
    const stack = error.stack || 'No stack';
    req.id = uuid;
    req.detail = message + ' - ' + stack;
    if(error.name == 'SequelizeValidationError') {
      return res.status(400).json({ error: uuid, message: message});
    }
    return res.status(500).json({ error: uuid, message: message});
}

module.exports = errorHandler;