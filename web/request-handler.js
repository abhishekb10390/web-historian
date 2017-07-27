var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var httpHelpers = require('./http-helpers');
var urlapi = require('url');
// require more modules/folders here!



exports.handleRequest = function (req, res) {
  // if (req.url === '/') {
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
        // httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + parsedUrl.href);
        archive.isUrlInList(parsedUrl, (isInList) => {
          if (isInList) {
            // archive.downloadUrls([parsedUrl]);
            archive.isUrlArchived(url, (isArchived) => {
              if (isArchived) {
                // console.log(archive.paths.archivedSites + '/' + parsedUrl);
                httpHelpers.serveAssets(res, archive.paths.archivedSites + '/' + parsedUrl, null, 302); 
              } else {
                httpHelpers.serveAssets(res, './web/public/loading.html', null, 302); 
              }
            });

          } else {
            archive.addUrlToList(parsedUrl, () => {
              //archive.downloadUrls([parsedUrl]);
              // fs.readFile('./web/public/loading.html', function(err, html) {
              //   if (err) {
              //     throw err;
              //   }
              //   statusCode = 301;
              //   //var newHeaders = _.extend(exports.headers, {});
              //   res.writeHead(statusCode, exports.headers);
              //   res.write(html);
              //   res.end();
              // });            


              httpHelpers.serveAssets(res, './web/public/loading.html', null, 302); 
            });
          }
        });  
      
        
      });

    }

  

  // res.end(archive.paths.list);
};
