var fs = require('fs');
var http = require('http');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */
exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};
exports.notInList = [];

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, sites) => {
    if (err) {
      throw err;
    }
    callback(sites.split('\n'));
  });
};

exports.isUrlInList = function(url, callback) {
  exports.readListOfUrls((urlList) => {
    var isInList = urlList.includes(url);
    if (!isInList) {
      exports.notInList.push(url);
    }
    callback(isInList);
  });
};

exports.addUrlToList = function(url, callback) {
  fs.appendFile(
    exports.paths.list, 
    url + '\n', 
    (err) => {
      if (err) {
        throw err;
      }
      callback();
    }
  );
};

exports.isUrlArchived = function(url, callback) {
  fs.access(exports.paths.archivedSites + '/' + url, (err, stats) => {
    if (err) {
      callback(false);
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  urls.forEach((url) => {
    console.log('now downloading http://' + url);
    request('https://' + url).pipe(fs.createWriteStream(exports.paths.archivedSites + '/' + url));
  });
  exports.notInList = [];
};
