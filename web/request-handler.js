var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
// require more modules/folders here!

var headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10,
  'Content-Type': 'application/json'
};

var sendResponse = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};

exports.handleRequest = function (req, res) {
  fs.readFile('./web/public/index.html', function(err, html) {
    if (err) {
      throw err;
    }
    statusCode = 200;
    headers['Content-Type'] = 'text/html';
    res.writeHead(statusCode, headers);
    res.write(html);
    res.end();
  });
  
  

  // fs.readFile('www.google.com', function(err, html) {
  //   if (err) {
  //     throw err;
  //   }
  //   statusCode = 200;
  //   headers['Content-Type'] = 'text/html';
  //   res.writeHead(statusCode, headers);
  //   res.write(html);
  //   res.end();
  // });


  // res.end(archive.paths.list);
};
