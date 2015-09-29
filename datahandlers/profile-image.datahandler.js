var rp = require('request-promise');

function googleImageQuery(query) {
  var baseUrl = 'https://www.googleapis.com/customsearch/v1';
  var googleAPIKey = process.env.GOOGLE_API_KEY;
  var cxCode = process.env.GOOGLE_CX_CODE;

  return rp(baseUrl + '?key=' + googleAPIKey + '&cx=' + cxCode + '&q=' + query + '&searchType=image');
}

exports.googleImageQuery = googleImageQuery;
