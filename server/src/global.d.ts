declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    MILJO?: 'mock' | 'dev-gcp' | 'prod-gcp';

    AVTALER_API_BASE_URL?: string;
    AVTALER_API_TARGET_AUDIENCE?: string;

    IDPORTEN_JWKS_URI?: string;
    IDPORTEN_CLIENT_ID?: string;

    TOKEN_X_WELL_KNOWN_URL?: string;
    TOKEN_X_TOKEN_ENDPOINT?: string;
    TOKEN_X_CLIENT_ID?: string;
    TOKEN_X_PRIVATE_JWK?: string;

    PORT?: string;

    USE_MSW?: 'true' | 'false';
  }
}
