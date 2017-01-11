/*  eslint-disable id-length */

import test from 'ava';
import MediaIndex from '../src/media-index';
import Config from './config';

const root = (typeof self === 'object' && self.self === self && self) || (typeof global === 'object' && global.global === global && global) || this; //eslint-disable-line
const user_id = 'aaronb';

root.Config = Config;

async function get_media_id() {
  const search_response = await MediaIndex.search();
  const search_json = await search_response.json();
  const random_index = Math.floor(Math.random() * (search_json.response.results.length + 1));
  const media_id = search_json.response.results[random_index].media_id;
  return media_id;
}

async function get_playlist_id() {
  const playlist_response = await MediaIndex.getPublicPlaylists();
  const playlist_json = await playlist_response.json();
  const random_index = Math.floor(Math.random() * (playlist_json.response.playlists.length + 1));
  const playlist_id = playlist_json.response.playlists[random_index].playlist_id;
  return playlist_id;
}

function generate_test_number() {
  return `test-${Math.random() * 999999999}`;
}

function test_helper(response, t) {
  if (response.ok) {
    t.pass();
  } else {
    response.json().then((json) => {
      console.error(json);
      t.fail();
    });
  }
}

test(async function getCategories(t) {
  const response = await MediaIndex.getCategories();
  test_helper(response, t);
});

test(async function getDerivatives(t) {
  const media_id = await get_media_id();
  const derivatives = await MediaIndex.getDerivatives({ media_id });
  test_helper(derivatives, t);
});

test(async function getDetail(t) {
  const media_id = await get_media_id();
  const response = await MediaIndex.getDetail({ media_id });
  test_helper(response, t);
});

test(async function getBulkDetail(t) {
  const media_id = await get_media_id();
  const response = await MediaIndex.getBulkDetail({ media_ids: [media_id] });
  test_helper(response, t);
});

test(async function getPopular(t) {
  const response = await MediaIndex.getPopular();
  test_helper(response, t);
});

test(async function getRelated(t) {
  const media_id = await get_media_id();
  const response = await MediaIndex.getRelated({ media_id });
  test_helper(response, t);
});

test(async function search(t) {
  const response = await MediaIndex.search();
  test_helper(response, t);
});

test(async function createPlaylist(t) {
  const playlist_name = generate_test_number();
  const response = await MediaIndex.createPlaylist({ user_id, playlist_name });
  test_helper(response, t);
});

test(async function getPlaylistDetail(t) {
  const playlist_id = await get_playlist_id();
  const response = await MediaIndex.getPlaylistDetail({ playlist_id, user_id });
  test_helper(response, t);
});

test(async function playlistDetailWithMedia(t) {
  const playlist_id = await get_playlist_id();
  const response = await MediaIndex.playlistDetailWithMedia({ playlist_id, user_id });
  test_helper(response, t);
});

test(async function getUserPlaylists(t) {
  const response = await MediaIndex.getUserPlaylists({ user_id });
  test_helper(response, t);
});

test(async function getPublicPlaylists(t) {
  const response = await MediaIndex.getPublicPlaylists();
  test_helper(response, t);
});

test(async function getPublicPlaylistDetail(t) {
  const playlist_id = await get_playlist_id();
  const response = await MediaIndex.getPublicPlaylistDetail({ playlist_id });
  test_helper(response, t);
});

test(async function getPublicPlaylistDetailWithMedia(t) {
  const playlist_id = await get_playlist_id();
  const response = await MediaIndex.getPublicPlaylistDetailWithMedia({ playlist_id });
  test_helper(response, t);
});

test(async function addSubscriptions(t) {
  const playlist_id = await get_playlist_id();
  const response = await MediaIndex.addSubscriptions({ playlist_id, user_id });
  test_helper(response, t);
});

test(async function deleteSubscription(t) {
  const playlist_id = await get_playlist_id();
  await MediaIndex.addSubscriptions({ playlist_id, user_id });
  const response = await MediaIndex.deleteSubscription({ playlist_id, user_id });
  test_helper(response, t);
});

test(async function getUserSubscriptions(t) {
  const response = await MediaIndex.getUserSubscriptions({ user_id });
  test_helper(response, t);
});

test(async function getSubscriptionDetail(t) {
  const playlist_id = await get_playlist_id();
  await MediaIndex.addSubscriptions({ playlist_id, user_id });
  const response = await MediaIndex.getSubscriptionDetail({ playlist_id, user_id });
  await MediaIndex.deleteSubscription({ playlist_id, user_id });
  test_helper(response, t);
});

test(async function getSubscriptionDetailwithMedia(t) {
  const playlist_id = await get_playlist_id();
  await MediaIndex.addSubscriptions({ playlist_id, user_id });
  const response = await MediaIndex.getSubscriptionDetailwithMedia({ playlist_id, user_id });
  await MediaIndex.deleteSubscription({ playlist_id, user_id });
  test_helper(response, t);
});
