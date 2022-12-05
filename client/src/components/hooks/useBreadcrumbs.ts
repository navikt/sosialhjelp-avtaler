import { useEffect } from 'react';
import { setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import { baseUrl } from '../../api/http';
import { useTranslation } from 'react-i18next';

function useBreadcrumbs(sider?: { tittel: string; path: string }[]) {
  const { t } = useTranslation();
  const forsideUrl = baseUrl('/');

  useEffect(() => {
    const breadcrumbs = [{ title: t('brødsmuler.forside'), url: forsideUrl }];
    sider?.forEach((side) => {
      const sideUrl = `${forsideUrl}${side.path}`;
      breadcrumbs.push({ title: side.tittel, url: sideUrl });
    });
    console.log(breadcrumbs);
    setBreadcrumbs(breadcrumbs);
  }, [sider]);
}

export default useBreadcrumbs;
