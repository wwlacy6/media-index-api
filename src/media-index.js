import 'universal-fetch';

const root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this; //eslint-disable-line

async function service(service_url, fetch_config) {
  try {
    const response = await fetch(
      `https://${root.Config.base_url[root.Config.env]}${service_url}?${toQueryString(fetch_config.params)}`,
      Object.assign({}, {
        headers: {
          api_key: root.Config.api_key[root.Config.env],
          Origin: null
        }
      }, fetch_config)
    );
    return response;
  } catch (err) {
    console.error(err);
  }
}

function toQueryString(params) {
  return Object.keys(params || {})
    .filter((key) => params[key])
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

export default {
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
  getCategories({
    checksum,
    display_locale,
    tags,
    people,
    dialect,
    search_term,
    media_type,
    extension
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/categories`, {
        method: 'GET',
        params: {
          checksum,
          dialect,
          display_locale,
          extension,
          media_type,
          people,
          search_term,
          tags
        }
      }
    );
  },

  /// @name getDerivatives
  /// @description Gets all derivatives of a specific media item by id - considered "like" content
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The ID of the media asset to get the details for
  /// @return {Promise}
  getDerivatives({
    checksum,
    cover_size,
    media_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/${media_id}/derivatives`, {
        method: 'GET',
        params: {
          checksum,
          cover_size
        }
      }
    );
  },

  /// @name getDetail
  /// @description Gets the detail of a specific media item by id
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The ID of the media asset to get the details for
  /// @return {Promise}
  getDetail({
    checksum,
    cover_size,
    media_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/${media_id}`, {
        method: 'GET',
        params: {
          checksum,
          cover_size
        }
      }
    );
  },

  /// @name getBulkDetail
  /// @description Gets the detail of multiple media items by id
  /// @arg {String} checksum - A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - The one dimentional size of the cover asset to return.
  /// @arg {Array, String} media_ids - An array of media ids to limit this call to
  /// @return {Promise}
  getBulkDetail({
    checksum,
    cover_size,
    media_ids
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/group`, {
        method: 'GET',
        params: {
          checksum,
          cover_size,
          media_ids
        }
      }
    );
  },

  /// @name getPopular
  /// @description Gets the details for "popular" media items
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size - [200] (optional) The one dimentional size of the cover asset to return.
  /// @arg {Number} limit - [10] (optional) A limit on results to return for the call
  /// @return {Promise}
  getPopular({
    checksum,
    cover_size,
    limit
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/popular`, {
        method: 'GET',
        params: {
          checksum,
          cover_size,
          limit
        }
      }
    );
  },

  /// @name getRelated
  /// @description Gets all derivatives of a specific meida item by id
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {Number} cover_size [200] - (optional) The one dimentional size of the cover asset to return.
  /// @arg {String} media_id - (required) The id of the media item that this call applys to
  /// @return {Promise}
  getRelated({
    media_id,
    checksum,
    cover_size
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/${media_id}/related`, {
        method: 'GET',
        params: {
          checksum,
          cover_size
        }
      }
    );
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
  search({
    category_ids,
    checksum,
    countries,
    cover_size,
    dialect,
    display_locale,
    extended,
    extension,
    histograms,
    limit,
    media_type,
    page,
    people,
    search_term,
    tags
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/search`, {
        method: 'GET',
        params: {
          category_ids,
          checksum,
          countries,
          cover_size,
          dialect,
          display_locale,
          extended,
          extension,
          histograms,
          limit,
          media_type,
          page,
          people,
          search_term,
          tags
        }
      }
    );
  },

  /// @name addToPlaylist
  /// @description - Add media to a playlist
  /// @arg {Array} media - (required) An array of media_id's to add to associate to the playlist
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  addToPlaylist({
    media,
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}/media`,
      {
        method: 'POST',
        body: JSON.stringify({
          media
        })
      }
    );
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
  createPlaylist({
    countries,
    description,
    discoverable,
    locale,
    media,
    owner_name,
    playlist_name,
    playlist_status,
    playlist_type,
    tags,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists`,
      {
        method: 'POST',
        body: JSON.stringify({
          countries,
          description,
          discoverable,
          locale,
          media,
          owner_name,
          playlist_name,
          playlist_status,
          playlist_type,
          tags,
          user_id
        })
      }
    );
  },

  /// @name deletePlaylist
  /// @description Delete a playlist
  /// @arg {String} playlist_id - (required) The unique id of the playlist
  /// @arg {String} user_id - The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deletePlaylist({
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}`,
      {
        method: 'DELETE'
      }
    );
  },

  /// @name getPlaylistDetail
  /// @description - retrieve all of the details for playlist given playlist_id
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The a unique playlist_id
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  getPlaylistDetail({
    checksum,
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name playlistDetailWithMedia
  /// @description - retrieve all of the details for playlist given playlist_id with media details
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The a unique playlist_id
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  playlistDetailWithMedia({
    checksum,
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}/media`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getUserPlaylists
  /// @description - retrieve all of the playlists for a user in a given app
  /// @arg {String} checksum - (optional)  A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (i.e. ufo_id, pc_id, etc.)
  /// @return {Promise}
  getUserPlaylists({
    checksum,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getPublicPlaylistDetail
  /// @description - retrieve details for a given publicly accessible playlist
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getPublicPlaylistDetail({
    checksum,
    playlist_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/playlists/${playlist_id}`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getPublicPlaylistDetailWithMedia
  /// @description - retrieve details and media for a given publicly accessible playlist
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getPublicPlaylistDetailWithMedia({
    checksum,
    playlist_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/playlists/${playlist_id}/media`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getPublicPlaylists
  /// @description - Retrieve all of the publically available playlists for a given app
  /// @arg {String} checksum - A checksum to compare to the generated calls checksum
  /// @arg {Array} countries - The ISO 639-2/B codes for countries
  /// @arg {Array} locale - Valid values are: en, en_us, zh, zh_tw, zh_hk, zh_cn, fr, fr_ca, es, es_mx, es_es
  /// @return {Promise}
  getPublicPlaylists({
    checksum,
    countries,
    locale
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/playlists`,
      {
        method: 'GET',
        params: {
          checksum,
          countries,
          locale
        }
      }
    );
  },

  /// @name deleteFromPlaylist
  /// @description - Delete a media from user's playlist
  /// @arg {Array} media (required) - An array of media_id's to remove from the playlist
  /// @arg {String} playlist_id (required) - The UUID of the playlist
  /// @arg {String} user_id (required) - The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deleteFromPlaylist({
    media,
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}/media`,
      {
        method: 'DELETE',
        body: JSON.stringify({
          media
        })
      }
    );
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
  updatePlaylist({
    countries,
    description,
    discoverable,
    locale,
    media,
    owner_name,
    playlist_id,
    playlist_name,
    playlist_status,
    playlist_type,
    tags,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/playlists/${playlist_id}`,
      {
        method: 'POST',
        body: JSON.stringify({
          countries,
          description,
          discoverable,
          locale,
          media,
          owner_name,
          playlist_name,
          playlist_status,
          playlist_type,
          tags
        })
      }
    );
  },

  /// @name addSubscriptions
  /// @description - Add a playlist subscription for a user
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  addSubscriptions({
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/subscriptions`,
      {
        method: 'POST',
        body: JSON.stringify({
          playlist_id
        })
      }
    );
  },

  /// @name deleteSubscription
  /// @description - Removes a playlist subscription for a user
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  deleteSubscription({
    playlist_id,
    user_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/subscriptions/${playlist_id}`,
      {
        method: 'DELETE'
      }
    );
  },

  /// @name getSubscriptionDetail
  /// @description - Retrieves subscription detail for a given subscription without any media
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required)  The a unique user_id (ufo_id, pc_id, etc.)
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getSubscriptionDetail({
    checksum,
    user_id,
    playlist_id,
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/subscriptions/${playlist_id}`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getSubscriptionDetailwithMedia
  /// @description - Retrieves subscription detail for a given subscription with media details
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @arg {String} playlist_id - (required) The UUID of the playlist
  /// @return {Promise}
  getSubscriptionDetailwithMedia({
    checksum,
    user_id,
    playlist_id
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/subscriptions/${playlist_id}/media`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  /// @name getUserSubscriptions
  /// @description - Retrieve all of the subscriptions for a user in a given app
  /// @arg {String} checksum - (optional) A checksum to compare to the generated calls checksum
  /// @arg {String} user_id - (required) The a unique user_id (ufo_id, pc_id, etc.)
  /// @return {Promise}
  getUserSubscriptions({
    checksum,
    user_id,
  } = {}) {
    return service(
      `/media/v1/app/${root.Config.app}/user/${user_id}/subscriptions`,
      {
        method: 'GET',
        params: {
          checksum
        }
      }
    );
  },

  authenticate({ username, password } = {}) {
    return service(
      '/ufo-security/v1/login',
      {
        method: 'POST',
        body: JSON.stringify({ username, password })
      }
    );
  }
};
