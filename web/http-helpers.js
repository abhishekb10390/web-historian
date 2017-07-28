var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');
var _ = require('underscore');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback, statusCode) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  fs.readFile(asset, function(err, html) {
    if (err) {
      throw err;
    }
    statusCode = statusCode || 200;
    //var newHeaders = _.extend(exports.headers, {});
    res.writeHead(statusCode, exports.headers);
    res.write(html);
    res.end();
  });
  
};

exports.sendResponse = (response, data, statusCode) => {
  statusCode = statusCode || 200;
  response.writeHead(statusCode, exports.headers);
  response.end(data);
};

exports.sendRedirect = (response, location, statusCode) => {
  statusCode = statusCode || 302;
  response.writeHead(statusCode, {Location: location});
  response.end();
};

exports.send404 = (response) => {
  exports.sendResponse(response, '404: Page not found', 404);
};
// As you progress, keep thinking about what helper functions you can put here!
