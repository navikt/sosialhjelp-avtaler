import { usePost } from '../api/usePost';
import { OpprettAvtaleResponse, SigneringsstatusRequest } from '../types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@navikt/ds-react';
import Spinner from '../components/Spinner';
import { logSkjemaFullført } from '../utils/amplitude';
import { usePageTitle } from '../components/hooks/usePageTitle';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import { useTranslation } from 'react-i18next';

const SigneringSuksess = () => {
  const statusQueryToken = new URLSearchParams(useLocation().search).get('status_query_token');
  const [isError, setIsError] = useState(false);
  const { uuid } = useParams<{ uuid: string }>();
  const { t } = useTranslation();

  usePageTitle(t('brødsmuler.signering_suksess'));
  useBreadcrumbs([{ tittel: t('brødsmuler.signering_suksess'), path: '/' }]);
  const navigate = useNavigate();
  const { post: sendStatus, data: avtale } = usePost<SigneringsstatusRequest, OpprettAvtaleResponse>(
    '/avtale/signeringsstatus',
  );

  useEffect(() => {
    if (statusQueryToken && uuid) {
      const sendStatusFunction = async () => {
        await sendStatus({
          uuid: uuid,
          token: statusQueryToken,
        });
      };
      sendStatusFunction().catch(() => setIsError(true));
    }
  }, [statusQueryToken, uuid]);

  useEffect(() => {
    if (avtale) {
      logSkjemaFullført(avtale.uuid);

      navigate('/opprett-avtale/kvittering', {
        state: avtale,
      });
    }
  }, [avtale]);

  return isError ? <Alert variant="error">Noe gikk galt ved lagring av avtalen. </Alert> : <Spinner />;
};
export default SigneringSuksess;
