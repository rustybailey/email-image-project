function parseGoogleResults(result) {
  var data = JSON.parse(result);
  var totalResults = parseInt(data.searchInformation.totalResults);
  var link;

  if (!totalResults) {
    return null;
  }

  link = data.items[0].link;
  // Fallback to thumbnail if link contains 'x-raw-image'
  if (link.indexOf('x-raw-image') > -1) {
    link = data.items[0].image.thumbnailLink;
  }
  return link;
}

module.exports = parseGoogleResults;
