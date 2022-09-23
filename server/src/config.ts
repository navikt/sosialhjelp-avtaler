import path from 'path';

export const config = {
  base_path: '/sosialhjelp/avtaler/',
  build_path: path.join(__dirname, '../../client/dist'),
  port: process.env.PORT || 5001,
  node_env: process.env.NODE_ENV || 'production',
  nais_cluster_name: process.env.NAIS_CLUSTER_NAME || 'mock-gcp',
  use_msw: process.env.USE_MSW === 'true',
  api: {
    avtaler_api_base_url: process.env.AVTALER_API_BASE_URL || 'http://localhost:9090',
    avtaler_api_target_audience: process.env.AVTALER_API_TARGET_AUDIENCE || 'local:sosialhjelp-avtaler-api',
  },
  auth: {
    idporten_jwks_uri: process.env.IDPORTEN_JWKS_URI || 'http://localhost:8080/default/jwks',
    idporten_client_id: process.env.IDPORTEN_CLIENT_ID || 'default',
    tokenx_well_known_url: process.env.TOKEN_X_WELL_KNOWN_URL || 'http://localhost:8080/default',
    tokenx_token_endpoint: process.env.TOKEN_X_TOKEN_ENDPOINT || 'http://localhost:8080/default/token',
    tokenx_client_id: process.env.TOKEN_X_CLIENT_ID || 'default',
    tokenx_private_jwk: process.env.TOKEN_X_PRIVATE_JWK || '',
  },
};
