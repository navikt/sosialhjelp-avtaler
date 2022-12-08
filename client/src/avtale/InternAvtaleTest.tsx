import { usePost } from '../api/usePost';
import { Alert, Button } from '@navikt/ds-react';
import { useEffect } from 'react';

const InternAvtaleTest = () => {
  const { post: startSignering, data: requestUrl } = usePost<Record<string, never>, string>(
    '/avtale/intern-test-signering'
  );

  const onTestSignering = async () => {
    await startSignering({});
  };

  useEffect(() => {
    if (requestUrl) {
      window.location.href = requestUrl;
    }
  }, [requestUrl]);

  return (
    <>
      <Alert variant="warning">NB! Denne siden er bare for intern testing</Alert>
      <Button onClick={onTestSignering}>Test signering</Button>
    </>
  );
};
export default InternAvtaleTest;
