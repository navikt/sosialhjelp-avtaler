interface Window {
  appSettings: {
    GIT_COMMIT?: string;
    MILJO?: 'mock-gcp' | 'dev-gcp' | 'prod-gcp';
    USE_MSW?: boolean;
  };
}
