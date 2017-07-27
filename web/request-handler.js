var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var urlapi = require('url');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  
  if (req.method === 'GET') {
    httpHelpers.serveAssets(res, './web/public/index.html');
  } else if (req.method === 'POST') {
    var url = '';
    req.on('data', (chunk) => {
      url += chunk;
    });
  
    req.on('end', () => {
      url = url.slice(4);
      
      parsedUrl = urlapi.parse(url);
      console.log(parsedUrl.href, 'href');
      archive.downloadUrls([parsedUrl.href]);
      // httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + parsedUrl.href);
      // archive.isUrlInList(url, (isInList) => {
      //   if (isInList) {
      //     archive.isUrlArchived(url, () => {});
      //   } else {
          
      //   }
      // });  
    
    });

    httpHelpers.serveAssets(res, './web/public/index.html'); 
  }

  // res.end(archive.paths.list);
};
