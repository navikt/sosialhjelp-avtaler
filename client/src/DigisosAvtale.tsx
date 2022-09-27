import styled from 'styled-components/macro';
import { Avtale, OpprettAvtale, OpprettAvtaleRequest } from './types';
import { useGet } from './api/useGet';
import { usePost } from './api/usePost';
import React, { ReactNode, useEffect } from 'react';
import { Loader } from '@navikt/ds-react';

const CenteredContent = styled.div`
  width: 100%;
  padding: 40px;
  text-align: center;
`;
export function DigisosAvtale() {
  const { data: avtale, error } = useGet<Avtale>('/avtale/Line');
  const { post: post, data: postResponse } = usePost<OpprettAvtale, Avtale>('/avtale');

  useEffect(() => {
    const avtale: OpprettAvtale = { navn: 'Ida' };
    post(avtale).catch((e) => console.log(e));
  }, []);

  if (!avtale && !error) {
    return (
      <CenteredContent>
        <Loader size="large" />
      </CenteredContent>
    );
  }

  if (avtale) {
    return (
      <main>
        <>
          <div>GET: {avtale.tittel}</div>
          {postResponse && <div>POST: {postResponse.tittel}</div>}
        </>
      </main>
    );
  }
  return null;
}
