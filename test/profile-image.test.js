var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;
var sinon = require('sinon');
require('sinon-as-promised');
var sinonChai = require("sinon-chai");
chai.use(sinonChai);

var profileImageDataHandler = require('../datahandlers/profile-image.datahandler');
var ProfileImageBusiness = require('../business/profile-image.business');
var profileImageBusiness = new ProfileImageBusiness(profileImageDataHandler);

var googleSearchData = '{"items":[{"kind":"customsearch#result","title":"rustybailey (Rusty Bailey) · GitHub","htmlTitle":"rustybailey (Rusty Bailey) · GitHub","link":"https://avatars2.githubusercontent.com/u/1975147?v=3&s=460","displayLink":"github.com","snippet":"rustybailey (Rusty Bailey) ·","htmlSnippet":"rustybailey (Rusty Bailey) ·","mime":"image/","fileFormat":"Image Document","image":{"contextLink":"https://github.com/rustybailey","height":460,"width":460,"byteSize":44914,"thumbnailLink":"https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSgTFzNfu7d6bQa5eczORnCm5gtAG8IJKnOyfn1vlgoQ6RoZ7QnOSi2lxn6jA","thumbnailHeight":128,"thumbnailWidth":128}},{"kind":"customsearch#result","title":"rustybailey (Rusty Bailey) · GitHub","htmlTitle":"rustybailey (Rusty Bailey) · GitHub","link":"https://avatars1.githubusercontent.com/u/2632230?v=3&s=84","displayLink":"github.com","snippet":"Organizations","htmlSnippet":"Organizations","mime":"image/","fileFormat":"Image Document","image":{"contextLink":"https://github.com/rustybailey","height":84,"width":84,"byteSize":5871,"thumbnailLink":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsZSZGWLROXx5aoEoJFPRBx455bpvSOnNd3d-MISw977CvehOF-tvOhcI","thumbnailHeight":76,"thumbnailWidth":76}}], "searchInformation": {"searchTime": 0.125569,"formattedSearchTime": "0.13","totalResults": "2","formattedTotalResults": "2"}}';

var emptyData = '{"items":[], "searchInformation": {"searchTime": 0.125569,"formattedSearchTime": "0.13","totalResults": "0","formattedTotalResults": "0"}}';

describe('getEmailImage', () => {
  var sandbox = sinon.sandbox.create(),
    encodedEmail = 'rustylbailey%40gmail.com',
    wrongEmail = 'rustyljhgigiuguigiugiugbailey%40gmail.com',
    getEmailImage;



  describe('get image from Google using email', () => {
    before(() => {
      sandbox.stub(profileImageDataHandler, 'googleImageQuery')
        .resolves(googleSearchData);

      getEmailImage = profileImageBusiness.getEmailImage(encodedEmail);
    });

    after(done => {
      sandbox.restore();
      done();
    });

    it('should fulfill the promise', () => {
      return expect(getEmailImage).to.be.fulfilled;
    });

    it('should call the Google search datahandler', () => {
      return expect(profileImageDataHandler.googleImageQuery).to.be.called;
    });

    it('should return the first link', () => {
      return expect(getEmailImage).to.eventually.equal("https://avatars2.githubusercontent.com/u/1975147?v=3&s=460");
    });
  });

  describe('get image from cache the second time', () => {
    before(() => {
      sandbox.stub(profileImageDataHandler, 'googleImageQuery')
        .resolves(googleSearchData);

      getEmailImage = profileImageBusiness.getEmailImage(encodedEmail);
    });

    after(done => {
      sandbox.restore();
      done();
    });

    it('should fulfill the promise', () => {
      return expect(getEmailImage).to.be.fulfilled;
    });

    it('should not call the Google search datahandler', () => {
      return expect(profileImageDataHandler.googleImageQuery).to.not.be.called;
    });

    it('should return the first link', () => {
      return expect(getEmailImage).to.eventually.equal("https://avatars2.githubusercontent.com/u/1975147?v=3&s=460");
    });
  });

  describe('get image from Google using email using wrong data', () => {
    before(() => {
      sandbox.stub(profileImageDataHandler, 'googleImageQuery')
        .resolves(emptyData);

      getEmailImage = profileImageBusiness.getEmailImage(wrongEmail);
    });

    after(done => {
      sandbox.restore();
      done();
    });

    it('should fulfill the promise', () => {
      return expect(getEmailImage).to.be.fulfilled;
    });

    it('should call the Google search datahandler', () => {
      return expect(profileImageDataHandler.googleImageQuery).to.be.called;
    });

    it('should return the first link', () => {
      return expect(getEmailImage).to.eventually.equal(null);
    });
  });

  describe('get image from cache the second time using wrong data', () => {
    before(() => {
      sandbox.stub(profileImageDataHandler, 'googleImageQuery')
        .resolves(emptyData);

      getEmailImage = profileImageBusiness.getEmailImage(wrongEmail);
    });

    after(done => {
      sandbox.restore();
      done();
    });

    it('should fulfill the promise', () => {
      return expect(getEmailImage).to.be.fulfilled;
    });

    it('should not call the Google search datahandler', () => {
      return expect(profileImageDataHandler.googleImageQuery).to.not.be.called;
    });

    it('should return the first link', () => {
      return expect(getEmailImage).to.eventually.equal(null);
    });
  });

});
