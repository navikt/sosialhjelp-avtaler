declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV?: 'development' | 'production';
    MILJO?: 'mock' | 'dev-gcp' | 'prod-gcp';

    AVTALER_API_BASE_URL?: string;
    AVTALER_API_TARGET_AUDIENCE?: string;

    PORT?: string;

    USE_MSW?: 'true' | 'false';
  }
}
