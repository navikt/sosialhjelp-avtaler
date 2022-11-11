import { usePost } from '../api/usePost';
import { OpprettAvtaleResponse, SigneringsstatusRequest } from '../types';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Alert } from '@navikt/ds-react';
import Spinner from '../components/Spinner';

const SigneringSuksess = () => {
  const statusQueryToken = new URLSearchParams(useLocation().search).get('status_query_token');
  const [isError, setIsError] = useState(false);
  const { orgnr } = useParams<{ orgnr: string }>();

  const navigate = useNavigate();
  const { post: sendStatus, data: avtale } = usePost<SigneringsstatusRequest, OpprettAvtaleResponse>(
    '/avtale/signeringsstatus'
  );

  useEffect(() => {
    console.log(statusQueryToken, orgnr);
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
      navigate('/opprett-avtale/kvittering', {
        state: avtale,
      });
    }
  }, [avtale]);

  return isError ? <Alert variant="error">Noe gikk galt ved lagring av avtalen. </Alert> : <Spinner />;
};
export default SigneringSuksess;
