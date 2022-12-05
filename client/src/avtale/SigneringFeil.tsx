import { useTranslation } from 'react-i18next';
import { BodyLong, Heading } from '@navikt/ds-react';
import { AppLink } from '../components/AppLink';
import { useEffect } from 'react';
import { logSkjemaInnsendingFeilet, skjemanavn } from '../utils/amplitude';
import { useParams } from 'react-router-dom';
import { usePageTitle } from '../components/hooks/usePageTitle';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';

const SigneringFeil = () => {
  const { t } = useTranslation();
  const { orgnr } = useParams<{ orgnr: string }>();

  usePageTitle(t('brødsmuler.signering_feil'));
  useBreadcrumbs([{ tittel: t('brødsmuler.signering_feil'), path: '/' }]);

  useEffect(() => {
    if (orgnr) {
      logSkjemaInnsendingFeilet(orgnr, skjemanavn.SKJEMANAVN_OPPRETT_AVTALE);
    }
  }, [orgnr]);

  return (
    <>
      <Heading level="2" size="large" spacing>
        {t('signering.feil')}
      </Heading>
      <BodyLong spacing>{t('signering.detaljer')}</BodyLong>
      <BodyLong spacing>
        <AppLink href="/">{t('signering.prov_igjen')}</AppLink> ({t('signering.videresendt')}).
      </BodyLong>
    </>
  );
};
export default SigneringFeil;
