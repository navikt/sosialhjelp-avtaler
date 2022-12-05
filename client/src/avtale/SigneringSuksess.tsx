import { usePost } from '../api/usePost';
import { OpprettAvtaleResponse, SigneringsstatusRequest } from '../types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@navikt/ds-react';
import Spinner from '../components/Spinner';
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude';
import { usePageTitle } from '../components/hooks/usePageTitle';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';
import { useTranslation } from 'react-i18next';

const SigneringSuksess = () => {
  const statusQueryToken = new URLSearchParams(useLocation().search).get('status_query_token');
  const [isError, setIsError] = useState(false);
  const { orgnr } = useParams<{ orgnr: string }>();
  const { t } = useTranslation();

  usePageTitle(t('brødsmuler.signering_suksess'));

  const navigate = useNavigate();
  const { post: sendStatus, data: avtale } = usePost<SigneringsstatusRequest, OpprettAvtaleResponse>(
    '/avtale/signeringsstatus'
  );

  useEffect(() => {
    if (statusQueryToken && orgnr) {
      const sendStatusFunction = async () => {
        await sendStatus({
          orgnr: orgnr,
          status: 'SUKSESS',
          token: statusQueryToken,
        });
      };
      sendStatusFunction().catch(() => setIsError(true));
    }
  }, [statusQueryToken, orgnr]);

  useEffect(() => {
    if (avtale) {
      logSkjemaFullført(avtale.orgnr);

      navigate('/opprett-avtale/kvittering', {
        state: avtale,
      });
    }
  }, [avtale]);

  return isError ? <Alert variant="error">Noe gikk galt ved lagring av avtalen. </Alert> : <Spinner />;
};
export default SigneringSuksess;
