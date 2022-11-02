import { useTranslation } from 'react-i18next';
import { BodyLong, Heading } from '@navikt/ds-react';
import { AppLink } from '../components/AppLink';

const SigneringFeil = () => {
  const { t } = useTranslation();
  return (
    <main>
      <>
        <Heading level="2" size="large" spacing>
          {t('signering.feil')}
        </Heading>
        <BodyLong spacing>{t('signering.detaljer')}</BodyLong>
        <BodyLong spacing>
          <AppLink href="/">{t('signering.prov_igjen')}</AppLink> ({t('signering.videresendt')}).
        </BodyLong>
      </>
    </main>
  );
};
export default SigneringFeil;
