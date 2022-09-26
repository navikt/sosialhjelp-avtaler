import styled from 'styled-components/macro';
import { Avtale, OpprettAvtale, OpprettAvtaleRequest } from './types';
import { useGet } from './api/useGet';
import { usePost } from './api/usePost';
import React, { ReactNode, useEffect } from 'react';

export function DigisosAvtale() {
  const { data: avtale } = useGet<Avtale>('/avtale/Line');
  const { post: post, data: postResponse } = usePost<OpprettAvtale, Avtale>('/avtale');

  useEffect(() => {
    const avtale: OpprettAvtale = { navn: 'Ida' };
    post(avtale).catch((e) => console.log(e));
  }, []);

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

  return <>Noe gikk galt..</>;
}
