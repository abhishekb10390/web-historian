var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var urlapi = require('url');

// require more modules/folders here!



exports.handleRequest = function (req, res) {
  // if (req.url === '/') {

  // var reqUrl = urlapi.parse(req);
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, './web/public/index.html');
  } else if (req.method === 'POST') {
    var url = '';
    req.on('data', (chunk) => {
      url += chunk;
    });
  
    req.on('end', () => {
      url = url.slice(4);
      parsedUrl = urlapi.parse(url).href;
      archive.isUrlInList(parsedUrl, (isInList) => {
        if (isInList) {
          archive.isUrlArchived(url, (isArchived) => {
            if (isArchived) {
              httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + parsedUrl, null, 302); 
            } else {
              httpHelpers.serveAssets(res, './web/public/loading.html', null, 302); 
            }
          });
        } else {
          archive.notInList.push(parsedUrl);
          console.log('adding to not in List', archive.notInList);
          archive.addUrlToList(parsedUrl, () => {
            httpHelpers.serveAssets(res, './web/public/loading.html', null, 302); 
          });
        }
      });  
    });
  }

  

  // res.end(archive.paths.list);
};
