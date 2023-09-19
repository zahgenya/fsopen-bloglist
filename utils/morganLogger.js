const morgan = require('morgan');

morgan.token('post-data', (req) => {
  if (req.method === 'POST') {
    return JSON.stringify(req.body);
  }
  return '-';
});

morgan.format =
  ':method :url :status :res[content-length] - :response-time ms :post-data';
morgan.options = {
  stream: process.stdout,
};

module.exports = morgan;
