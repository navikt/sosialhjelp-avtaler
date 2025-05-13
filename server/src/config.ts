import path from 'path';

export const config = {
  base_path: '/sosialhjelp/avtaler/',
  build_path: path.join(__dirname, '../../client/dist'),
  port: process.env.PORT || 5001,
  node_env: process.env.NODE_ENV || 'production',
  miljo: process.env.MILJO || 'mock',
  use_msw: process.env.USE_MSW === 'true',
  api: {
    avtaler_api_base_url: process.env.AVTALER_API_BASE_URL || 'http://localhost:8080/sosialhjelp/avtaler-api',
    avtaler_api_target_audience: process.env.AVTALER_API_TARGET_AUDIENCE || 'local:sosialhjelp-avtaler-api',
  },
};
