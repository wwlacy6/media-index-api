/* eslint-disable */

require('dotenv').config();

export default {
  app: process.env.MEDIA_INDEX_APP,
  env: process.env.MEDIA_INDEX_ENVIRONMENT,
  base_url: {
    personal_area: process.env.MEDIA_INDEX_PERSONAL_AREA_BASE_URL,
    development: process.env.MEDIA_INDEX_DEVELOPMENT_BASE_URL,
    staging: process.env.MEDIA_INDEX_STAGING_BASE_URL,
    production: process.env.MEDIA_INDEX_PRODUCTION_BASE_URL
  },
  api_key: {
    personal_area: '',
    development: '',
    staging: process.env.MEDIA_INDEX_SANDBOX_GATEWAY_API_KEY,
    production: process.env.MEDIA_INDEX_PRODUCTION_GATEWAY_API_KEY
  },
  user_id: {
    personal_area: process.env.MEDIA_INDEX_PERSONAL_AREA_USER_ID,
    development: process.env.MEDIA_INDEX_DEVELOPMENT_USER_ID,
    staging: process.env.MEDIA_INDEX_STAGING_USER_ID,
    production: process.env.MEDIA_INDEX_PRODUCTION_USER_ID
  },
};
