'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

//eslint-disable-line

var service = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(service_url, fetch_config) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return fetch('https://' + root.Config.base_url[root.Config.env] + service_url + '?' + toQueryString(fetch_config.params), (0, _assign2.default)({}, {
              headers: {
                apiKey: root.Config.api_key[root.Config.env]
              }
            }, fetch_config));

          case 3:
            response = _context.sent;
            return _context.abrupt('return', response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0);

          case 10:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 7]]);
  }));

  return function service(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

require('universal-fetch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var root = (typeof self === 'undefined' ? 'undefined' : (0, _typeof3.default)(self)) === 'object' && self.self === self && self || (typeof global === 'undefined' ? 'undefined' : (0, _typeof3.default)(global)) === 'object' && global.global === global && global || undefined;

function toQueryString(params) {
  return (0, _keys2.default)(params || {}).filter(function (key) {
    return params[key];
  }).map(function (key) {
    return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
  }).join('&');
}

exports.default = {
  /// @name getCategories
  /// @description Returns all categories for a given app by calling Elasticsearch
  /// @arg {Array, String} countries ['ALL'] - (optional) The ISO 639-2/B codes for countries
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Array, String} tags - (optional) Limits the categories to videos taged with any of the provided tags
  /// @arg {Array, String} people - (optional) Limits the categories to videos taged with any of the provided people
  /// @arg {String} dialect - (optional) A dialect to filter the results on
  /// @arg {String} display_locale - (optional) Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {String} search_term [*] - (optional) The string to search on.  Filters by title and description.
  /// @arg {String} media_type - (optional) The type of media (Audio, Video, Document), to limit the search to.
  /// @arg {String} extension - (optional) The file extension to limit the search by.
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

    return service('/media/v1/app/' + root.Config.app + '/categories', {
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
  /// @description Gets all derivatives of a specific media item by id - considered "like" content
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The ID of the media asset to get the details for
  /// @return {Promise}
  getDerivatives: function getDerivatives() {
    var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref3.checksum,
        cover_size = _ref3.cover_size,
        media_id = _ref3.media_id;

    return service('/media/v1/app/' + root.Config.app + '/' + media_id + '/derivatives', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name getDetail
  /// @description Gets the detail of a specific media item by id
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The ID of the media asset to get the details for
  /// @return {Promise}
  getDetail: function getDetail() {
    var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref4.checksum,
        cover_size = _ref4.cover_size,
        media_id = _ref4.media_id;

    return service('/media/v1/app/' + root.Config.app + '/' + media_id, {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name getBulkDetail
  /// @description Gets the detail of multiple media items by id
  /// @arg {String} checksum - A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - The one dimentional size of the cover asset to return.
  /// @arg {Array, String} media_ids - An array of media ids to limit this call to
  /// @return {Promise}
  getBulkDetail: function getBulkDetail() {
    var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref5.checksum,
        cover_size = _ref5.cover_size,
        media_ids = _ref5.media_ids;

    return service('/media/v1/app/' + root.Config.app + '/group', {
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
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size - [200] (optional) The one dimentional size of the cover asset to return.
  /// @arg {Number} limit - [10] (optional) A limit on results to return for the call
  /// @return {Promise}
  getPopular: function getPopular() {
    var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref6.checksum,
        cover_size = _ref6.cover_size,
        limit = _ref6.limit;

    return service('/media/v1/app/' + root.Config.app + '/popular', {
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
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The id of the media item that this call applys to
  /// @return {Promise}
  getRelated: function getRelated() {
    var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        media_id = _ref7.media_id,
        checksum = _ref7.checksum,
        cover_size = _ref7.cover_size;

    return service('/media/v1/app/' + root.Config.app + '/' + media_id + '/related', {
      method: 'GET',
      params: {
        checksum: checksum,
        cover_size: cover_size
      }
    });
  },


  /// @name search
  /// @description Creates a Promise to call a Media Index endpoint to search the media index based on the provided parameters.
  /// @arg {Array, String} category_ids - (optional)  Limits the search to media set to the provided category ids.
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {Array, String} countries - (optional)  The ISO 639-2/B codes for countries
  /// @arg {Number} cover_size - (optional)  The one dimentional size of the cover asset to return.
  /// @arg {String} dialect - (optional)  A dialect to filter the results on
  /// @arg {String} display_locale - (optional)  Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {String} extension - (optional)  The file extension to limit the search by.
  /// @arg {Boolean} extended - (optional) return expanded results.
  /// @arg {Boolean} histograms [true] - (optional)  Whether the response should include histograms or not
  /// @arg {Number} limit - (optional)  A limit on results to return for the call
  /// @arg {String} media_type - (optional)  The type of media (Audio, Video, Document), to limit the search to.
  /// @arg {Number} page - (optional)  The page to return assuming limits are being used.
  /// @arg {Array, String} people - (optional)  Limits the categories to media taged with any of the provided people
  /// @arg {String} search_term [*] - (optional)  The string to search on.  Filters by title and description.
  /// @arg {Array, String} tags - (optional)  Limits the search to media taged with any of the provided tags
  /// @return {Promise}
  search: function search() {
    var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        category_ids = _ref8.category_ids,
        checksum = _ref8.checksum,
        countries = _ref8.countries,
        cover_size = _ref8.cover_size,
        dialect = _ref8.dialect,
        display_locale = _ref8.display_locale,
        extended = _ref8.extended,
        extension = _ref8.extension,
        histograms = _ref8.histograms,
        limit = _ref8.limit,
        media_type = _ref8.media_type,
        page = _ref8.page,
        people = _ref8.people,
        search_term = _ref8.search_term,
        tags = _ref8.tags;

    return service('/media/v1/app/' + root.Config.app + '/search', {
      method: 'GET',
      params: {
        category_ids: category_ids,
        checksum: checksum,
        countries: countries,
        cover_size: cover_size,
        dialect: dialect,
        display_locale: display_locale,
        extended: extended,
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
  /// @description - Add media to a playlist
  /// @arg {Array} media - (required) An array of media_id's to add to associate to the playlist
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  addToPlaylist: function addToPlaylist() {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        media = _ref9.media,
        playlist_id = _ref9.playlist_id,
        user_id = _ref9.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id + '/media', {
      method: 'POST',
      body: (0, _stringify2.default)({
        media: media
      })
    });
  },


  /// @name createPlaylist
  /// @description Create a playlist
  /// @arg {Array, String} countries - (optional) The ISO 639-2/B codes for countries, ['ALL'] or ['USA']
  /// @arg {String} description - (optional) A description for the playlist
  /// @arg {Boolean} discoverable - (optional) A boolean value indicating whether or not the playlist is discoverable
  /// @arg {Array} locale - (optional) Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {Array} media - (optional) - An array of media_id's to add to associate to the playlist
  /// @arg {String} owner_name - (optional) The name of the owner / user that is creating the playlist
  /// @arg {String} playlist_name - (required) The name of the playlist
  /// @arg {String} playlist_status - (optional) The status of the playlist.  Valid values are: active, inactive
  /// @arg {String} playlist_type - (optional) The type of playlist.  Valid values are: user, corporate
  /// @arg {Array} tags - (optional) An array of tags to associate to the playlist
  /// @arg {String} user_id - The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  createPlaylist: function createPlaylist() {
    var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        countries = _ref10.countries,
        description = _ref10.description,
        discoverable = _ref10.discoverable,
        locale = _ref10.locale,
        media = _ref10.media,
        owner_name = _ref10.owner_name,
        playlist_name = _ref10.playlist_name,
        playlist_status = _ref10.playlist_status,
        playlist_type = _ref10.playlist_type,
        tags = _ref10.tags,
        user_id = _ref10.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists', {
      method: 'POST',
      body: (0, _stringify2.default)({
        countries: countries,
        description: description,
        discoverable: discoverable,
        locale: locale,
        media: media,
        owner_name: owner_name,
        playlist_name: playlist_name,
        playlist_status: playlist_status,
        playlist_type: playlist_type,
        tags: tags,
        user_id: user_id
      })
    });
  },


  /// @name deletePlaylist
  /// @description Delete a playlist
  /// @arg {String} playlist_id - (required) The unique id of the playlist
  /// @arg {String} user_id - The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deletePlaylist: function deletePlaylist() {
    var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        playlist_id = _ref11.playlist_id,
        user_id = _ref11.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id, {
      method: 'DELETE'
    });
  },


  /// @name getPlaylistDetail
  /// @description - retrieve all of the details for playlist given playlist_id
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The a unique playlist_id
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  getPlaylistDetail: function getPlaylistDetail() {
    var _ref12 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref12.checksum,
        playlist_id = _ref12.playlist_id,
        user_id = _ref12.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id, {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name playlistDetailWithMedia
  /// @description - retrieve all of the details for playlist given playlist_id with media details
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The a unique playlist_id
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  playlistDetailWithMedia: function playlistDetailWithMedia() {
    var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref13.checksum,
        playlist_id = _ref13.playlist_id,
        user_id = _ref13.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id + '/media', {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getUserPlaylists
  /// @description - retrieve all of the playlists for a user in a given app
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  getUserPlaylists: function getUserPlaylists() {
    var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref14.checksum,
        user_id = _ref14.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists', {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getPublicPlaylistDetail
  /// @description - retrieve details for a given publicly accessible playlist
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getPublicPlaylistDetail: function getPublicPlaylistDetail() {
    var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref15.checksum,
        playlist_id = _ref15.playlist_id;

    return service('/media/v1/app/' + root.Config.app + '/playlists/' + playlist_id, {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getPublicPlaylistDetailWithMedia
  /// @description - retrieve details and media for a given publicly accessible playlist
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getPublicPlaylistDetailWithMedia: function getPublicPlaylistDetailWithMedia() {
    var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref16.checksum,
        playlist_id = _ref16.playlist_id;

    return service('/media/v1/app/' + root.Config.app + '/playlists/' + playlist_id + '/media', {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getPublicPlaylists
  /// @description - Retrieve all of the publically available playlists for a given app
  /// @arg {String} checksum - A checksum to compare to the generated calls checksum
  /// @arg {Array} countries - The ISO 639-2/B codes for countries
  /// @arg {Array} locale - Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @return {Promise}
  getPublicPlaylists: function getPublicPlaylists() {
    var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref17.checksum,
        countries = _ref17.countries,
        locale = _ref17.locale;

    return service('/media/v1/app/' + root.Config.app + '/playlists', {
      method: 'GET',
      params: {
        checksum: checksum,
        countries: countries,
        locale: locale
      }
    });
  },


  /// @name deleteFromPlaylist
  /// @description - Delete a media from user's playlist
  /// @arg {Array} media (required) - An array of media_id's to remove from the playlist
  /// @arg {String} playlist_id (required) - The UUID of the playlist
  /// @arg {String} user_id (required) - The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deleteFromPlaylist: function deleteFromPlaylist() {
    var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        media = _ref18.media,
        playlist_id = _ref18.playlist_id,
        user_id = _ref18.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id + '/media', {
      method: 'DELETE',
      body: (0, _stringify2.default)({
        media: media
      })
    });
  },


  /// @name updatePlaylist
  /// @description - Update an existing playlist with new data
  /// @arg {Array, String} countries - (optional) The ISO 639-2/B codes for countries, ['ALL'] or ['USA']
  /// @arg {String} description - (optional) A description for the playlist
  /// @arg {Boolean} discoverable - (optional) A boolean value indicating whether or not the playlist is discoverable
  /// @arg {Array} locale - (optional) Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @arg {Array} media - (optional) - An array of media_id's to add to associate to the playlist
  /// @arg {String} owner_name - (optional) The name of the owner / user that is creating the playlist
  /// @arg {String} playlist_id -  (required) The unique id of the playlist
  /// @arg {String} playlist_name - (required) The name of the playlist
  /// @arg {String} playlist_status - (optional) The status of the playlist.  Valid values are: active, inactive
  /// @arg {String} playlist_type - (optional) The type of playlist.  Valid values are: user, corporate
  /// @arg {Array} tags - (optional) An array of tags to associate to the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  updatePlaylist: function updatePlaylist() {
    var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        countries = _ref19.countries,
        description = _ref19.description,
        discoverable = _ref19.discoverable,
        locale = _ref19.locale,
        media = _ref19.media,
        owner_name = _ref19.owner_name,
        playlist_id = _ref19.playlist_id,
        playlist_name = _ref19.playlist_name,
        playlist_status = _ref19.playlist_status,
        playlist_type = _ref19.playlist_type,
        tags = _ref19.tags,
        user_id = _ref19.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/playlists/' + playlist_id, {
      method: 'POST',
      body: (0, _stringify2.default)({
        countries: countries,
        description: description,
        discoverable: discoverable,
        locale: locale,
        media: media,
        owner_name: owner_name,
        playlist_name: playlist_name,
        playlist_status: playlist_status,
        playlist_type: playlist_type,
        tags: tags
      })
    });
  },


  /// @name addSubscriptions
  /// @description - Add a playlist subscription for a user
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  addSubscriptions: function addSubscriptions() {
    var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        playlist_id = _ref20.playlist_id,
        user_id = _ref20.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/subscriptions', {
      method: 'POST',
      body: (0, _stringify2.default)({
        playlist_id: playlist_id
      })
    });
  },


  /// @name deleteSubscription
  /// @description - Removes a playlist subscription for a user
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deleteSubscription: function deleteSubscription() {
    var _ref21 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        playlist_id = _ref21.playlist_id,
        user_id = _ref21.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/subscriptions/' + playlist_id, {
      method: 'DELETE'
    });
  },


  /// @name getSubscriptionDetail
  /// @description - Retrieves subscription detail for a given subscription without any media
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required)  The a unique user_id (ufo_id, pc_id, etc.)
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getSubscriptionDetail: function getSubscriptionDetail() {
    var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref22.checksum,
        user_id = _ref22.user_id,
        playlist_id = _ref22.playlist_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/subscriptions/' + playlist_id, {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getSubscriptionDetailwithMedia
  /// @description - Retrieves subscription detail for a given subscription with media details
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getSubscriptionDetailwithMedia: function getSubscriptionDetailwithMedia() {
    var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref23.checksum,
        user_id = _ref23.user_id,
        playlist_id = _ref23.playlist_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/subscriptions/' + playlist_id + '/media', {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  },


  /// @name getUserSubscriptions
  /// @description - Retrieve all of the subscriptions for a user in a given app
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  getUserSubscriptions: function getUserSubscriptions() {
    var _ref24 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        checksum = _ref24.checksum,
        user_id = _ref24.user_id;

    return service('/media/v1/app/' + root.Config.app + '/user/' + user_id + '/subscriptions', {
      method: 'GET',
      params: {
        checksum: checksum
      }
    });
  }
};