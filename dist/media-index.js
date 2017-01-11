'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _entries = require('babel-runtime/core-js/object/entries');

var _entries2 = _interopRequireDefault(_entries);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var service = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(service_url, fetch_config) {
    var params, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, key, value, response;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            params = '';

            if (!(fetch_config.method === 'GET' && fetch_config.params)) {
              _context.next = 24;
              break;
            }

            params = new _urlSearchParams2.default();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 7;
            for (_iterator = (0, _getIterator3.default)((0, _entries2.default)(fetch_config.params)); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              _step$value = (0, _slicedToArray3.default)(_step.value, 2), key = _step$value[0], value = _step$value[1];

              if (value) params.set(key, value);
            }
            _context.next = 15;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](7);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 15:
            _context.prev = 15;
            _context.prev = 16;

            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }

          case 18:
            _context.prev = 18;

            if (!_didIteratorError) {
              _context.next = 21;
              break;
            }

            throw _iteratorError;

          case 21:
            return _context.finish(18);

          case 22:
            return _context.finish(15);

          case 23:
            params = '?' + params.toString();

          case 24:
            _context.next = 26;
            return fetch('https://' + base_url + service_url + params, (0, _assign2.default)({}, fetch_defaults, fetch_config));

          case 26:
            response = _context.sent;
            return _context.abrupt('return', response);

          case 30:
            _context.prev = 30;
            _context.t1 = _context['catch'](0);

            console.log(_context.t1);

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 30], [7, 11, 15, 23], [16,, 18, 22]]);
  }));

  return function service(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

require('isomorphic-fetch');

var _urlSearchParams = require('url-search-params');

var _urlSearchParams2 = _interopRequireDefault(_urlSearchParams);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import 'whatwg-fetch';
var Config = {
  app: 'ufm',
  env: 'prod',
  layer7: {
    dev: 'devapi.unfranchise.com/api',
    staging: 'staging-api.shop.com',
    prod: 'api.shop.com'
  },
  layer7_key: 'l7xx37a770e1416d471f86f6039342144f8f'
};

var app = Config.app;
var base_url = Config.layer7[Config.env];
var fetch_defaults = {
  headers: {
    apiKey: Config.layer7_key
  }
};

exports.default = {

  /// @name getCategories
  /// @description Returns all categories for a given app by calling Elasticsearch
  /// @arg {Array, String} countries ['ALL', 'USA'] - The ISO 639-2/B codes for countries
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {Array, String} tags - Limits the categories to videos taged with any of the provided tags
  /// @arg {Array, String} people - Limits the categories to videos taged with any of the provided people
  /// @arg {String} dialect - A dialect to filter the results on
  /// @arg {String} display_locale - Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {String} search_term - The string to search on.  Filters by title and description.
  /// @arg {String} media_type - The type of media (Audio, Video, Document), to limit the search to.
  /// @arg {String} extension - The file extension to limit the search by.
  getCategories: function getCategories() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref2.checksum,
        display_locale = _ref2.display_locale,
        tags = _ref2.tags,
        people = _ref2.people,
        dialect = _ref2.dialect,
        search_term = _ref2.search_term,
        media_type = _ref2.media_type,
        extension = _ref2.extension;

    return service('/media/v1/app/' + app + '/categories', {
      method: 'GET',
      params: {
        checksum: checksum,
        dialect: dialect,
        display_locale: display_locale,
        extension: extension,
        media_type: media_type,
        people: people,
        search_term: search_term,
        tags: tags
      }
    });
  },


  /// @name getDerivatives
  /// @description Gets all derivatives of a specific media item by id
  /// @arg {String} mediaID - The id of the media item that this call applys to
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {Number} cover_size - The one dimentional size of the cover asset to return.
  /// @return {Promise}
  getDerivatives: function getDerivatives() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref3.checksum,
        cover_size = _ref3.cover_size,
        media_id = _ref3.media_id;

    return service('/media/v1/app/' + app + '/' + media_id + '/derivatives', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name getDetail
  /// @description Gets the detail of a specific media item by id
  /// @arg {String} mediaID - The id of the media item that this call applys to
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {Number} cover_size - The one dimentional size of the cover asset to return.
  /// @return {Promise}
  getDetail: function getDetail() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref4.checksum,
        cover_size = _ref4.cover_size,
        media_id = _ref4.media_id;

    return service('/media/v1/app/' + app + '/' + media_id, {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name getBulkDetail
  /// @description Gets the detail of multiple media items by id
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {Number} cover_size - The one dimentional size of the cover asset to return.
  /// @arg {Array, String} media_ids - An array of media ids to limit this call to
  /// @return {Promise}
  getBulkDetail: function getBulkDetail() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref5.checksum,
        cover_size = _ref5.cover_size,
        media_ids = _ref5.media_ids;

    return service('/media/v1/app/' + app + '/group', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size,
        media_ids: media_ids
      }
    });
  },


  /// @name getPopular
  /// @description Gets the details for "popular" media items
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {Number} cover_size - The one dimentional size of the cover asset to return.
  /// @arg {Number} limit - A limit on results to return for the call
  /// @return {Promise}
  getPopular: function getPopular() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref6.checksum,
        cover_size = _ref6.cover_size,
        limit = _ref6.limit;

    return service('/media/v1/app/' + app + '/popular', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size,
        limit: limit
      }
    });
  },


  /// @name getRelated
  /// @description Gets all derivatives of a specific meida item by id
  /// @arg {String} mediaID - The id of the media item that this call applys to
  /// @arg {Number} cover_size [200] - The one dimentional size of the cover asset to return.
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @return {Promise}
  getRelated: function getRelated() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        media_id = _ref7.media_id,
        checksum = _ref7.checksum,
        cover_size = _ref7.cover_size;

    return service('/media/v1/app/' + app + '/' + media_id + '/related', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name search
  /// @description Creates a Promise to call a Media Index endpoint to search the media index based on the provided parameters.
  /// @arg {Array, String} category_ids - Limits the search to media set to the provided category ids.
  /// @arg {Array, String} countries - The ISO 639-2/B codes for countries
  /// @arg {String} checksum - A checksum returned by a previous call passed in with a chance of getting a 304
  /// @arg {String} search_term - The string to search on.  Filters by title and description.
  /// @arg {Number} cover_size - The one dimentional size of the cover asset to return.
  /// @arg {Array, String} tags - Limits the search to media taged with any of the provided tags
  /// @arg {Array, String} people - Limits the categories to media taged with any of the provided people
  /// @arg {String} dialect - A dialect to filter the results on
  /// @arg {String} display_locale - Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {Number} limit - A limit on results to return for the call
  /// @arg {Number} page - The page to return assuming limits are being used.
  /// @arg {Boolean} histograms - Whether the response should include histograms or not
  /// @arg {String} media_type - The type of media (Audio, Video, Document), to limit the search to.
  /// @arg {String} extension - The file extension to limit the search by.
  /// @return {Promise}
  search: function search() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        category_ids = _ref8.category_ids,
        checksum = _ref8.checksum,
        countries = _ref8.countries,
        cover_size = _ref8.cover_size,
        dialect = _ref8.dialect,
        display_locale = _ref8.display_locale,
        extension = _ref8.extension,
        histograms = _ref8.histograms,
        limit = _ref8.limit,
        media_type = _ref8.media_type,
        page = _ref8.page,
        people = _ref8.people,
        search_term = _ref8.search_term,
        tags = _ref8.tags;

    return service('/media/v1/app/' + app + '/search', {
      method: 'GET',
      params: {
        category_ids: category_ids,
        checksum: checksum,
        countries: countries,
        cover_size: cover_size,
        dialect: dialect,
        display_locale: display_locale,
        extension: extension,
        histograms: histograms,
        limit: limit,
        media_type: media_type,
        page: page,
        people: people,
        search_term: search_term,
        tags: tags
      }
    });
  },


  /// @name addToPlaylist
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  addToPlaylist: function addToPlaylist() {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        media_ids = _ref9.media_ids,
        playlist_id = _ref9.playlist_id,
        user_id = _ref9.user_id;

    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists/' + playlist_id + '/media', {
      method: 'POST',
      body: {
        media_ids: media_ids
      }
    });
  },


  /// @name createPlaylist
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  createPlaylist: function createPlaylist(user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists');
  },


  /// @name getPlaylistDetail
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getPlaylistDetail: function getPlaylistDetail(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists/' + playlist_id);
  },


  /// @name playlistDetailWithMedia
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  playlistDetailWithMedia: function playlistDetailWithMedia(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists/' + playlist_id + '/media');
  },


  /// @name getUserPlaylists
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getUserPlaylists: function getUserPlaylists(user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists');
  },


  /// @name getPublicPlaylistDetail
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getPublicPlaylistDetail: function getPublicPlaylistDetail(playlist_id) {
    return service('/media/v1/app/' + app + '/playlists/' + playlist_id);
  },


  /// @name getPublicPlaylistDetailWithMedia
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getPublicPlaylistDetailWithMedia: function getPublicPlaylistDetailWithMedia(playlist_id) {
    return service('/media/v1/app/' + app + '/playlists/' + playlist_id + '/media');
  },


  /// @name getAvailablePublicPlaylists
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getAvailablePublicPlaylists: function getAvailablePublicPlaylists() {
    return service('/media/v1/app/' + app + '/playlists');
  },


  /// @name deleteFromPlaylist
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  deleteFromPlaylist: function deleteFromPlaylist(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists/' + playlist_id + '/media');
  },


  /// @name updatePlaylist
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  updatePlaylist: function updatePlaylist(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/playlists/' + playlist_id);
  },


  /// @name addSubscriptions
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  addSubscriptions: function addSubscriptions(user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/subscriptions');
  },


  /// @name deleteSubscription
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  deleteSubscription: function deleteSubscription(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/subscriptions/' + playlist_id);
  },


  /// @name getSubscriptionDetail
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getSubscriptionDetail: function getSubscriptionDetail(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/subscriptions/' + playlist_id);
  },


  /// @name getSubscriptionDetailwithMedia
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getSubscriptionDetailwithMedia: function getSubscriptionDetailwithMedia(playlist_id, user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/subscriptions/' + playlist_id + '/media');
  },


  /// @name getAvailableSubscriptions
  /// @description
  /// @arg {String} playlist_id
  /// @return {Promise}
  getAvailableSubscriptions: function getAvailableSubscriptions(user_id) {
    return service('/media/v1/app/' + app + '/user/' + user_id + '/subscriptions');
  }
};