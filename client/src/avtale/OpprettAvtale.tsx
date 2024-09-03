import { Alert, BodyLong, Button, ConfirmationPanel, Heading, ReadMore, VStack } from '@navikt/ds-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppLink } from '../components/AppLink';
import { Avstand } from '../components/Avstand';
import { AvtaleResponse } from '../types';
import { useGet } from '../api/useGet';
import { usePost } from '../api/usePost';
import { logLastNedAvtale, logSkjemaStartet, logSkjemaStegFullført } from '../utils/amplitude';
import Spinner from '../components/Spinner';
import { usePageTitle } from '../components/hooks/usePageTitle';
import useBreadcrumbs from '../components/hooks/useBreadcrumbs';

export function OpprettAvtale() {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  const { uuid } = useParams<{ uuid: string }>();
  const { data: avtale, error: avtaleError } = useGet<AvtaleResponse>(`/avtale/${uuid}`);
  const { data: kommunenavn, error: kommunenavnError } = useGet<{ kommunenavn: string }>(
    avtale ? `/kommuner/${avtale.orgnr}` : null,
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ lest: boolean }>({
    defaultValues: {
      lest: false,
    },
  });
  const { post: startSignering, data: requestUrl } = usePost<never, string>(`/avtale/${uuid}/signer`);
  const navigate = useNavigate();
  usePageTitle(t('brødsmuler.opprett'));
  useBreadcrumbs([{ tittel: t('brødsmuler.opprett'), path: '/' }]);

  useEffect(() => {
    if (uuid) {
      logSkjemaStartet(uuid);
    }
  }, [uuid]);

  useEffect(() => {
    if (requestUrl) {
      window.location.href = requestUrl;
    }
  }, [requestUrl]);

  if (!avtale && !avtaleError && !kommunenavn && !kommunenavnError) {
    return <Spinner />;
  }

  if (!avtale || !kommunenavn) {
    return null;
  }

  if (avtale.erSignert) {
    navigate('/opprett-avtale/kvittering', {
      state: avtale,
    });
    return null;
  }
  return (
    <>
      <Heading level="2" size="medium" spacing>
        {t('avtale.opprett_avtale_for', { kommune: kommunenavn.kommunenavn })}
      </Heading>
      {avtale.ingress && language === 'nb' && (
        <BodyLong spacing style={{ whiteSpace: 'pre-wrap' }}>
          {avtale.ingress}
        </BodyLong>
      )}
      {avtale.ingressNynorsk && language === 'nn' && (
        <BodyLong spacing style={{ whiteSpace: 'pre-wrap' }}>
          {avtale.ingressNynorsk}
        </BodyLong>
      )}
      <VStack gap="4">
        <BodyLong>
          <AppLink
            href={`/api/avtale/${avtale.uuid}/avtale`}
            target="_blank"
            onClick={() => logLastNedAvtale(window.location.href)}
          >
            {t('avtale.lenke_last_ned_avtalemalen')}
          </AppLink>
        </BodyLong>
        <BodyLong>{t('avtale.arkivering')}</BodyLong>
      </VStack>
      <Avstand marginTop={5} marginBottom={5}>
        <ReadMore header={t('personopplysninger.overskrift')}>{t('personopplysninger.detaljer')}</ReadMore>
      </Avstand>
      <form
        onSubmit={handleSubmit(async () => {
          await startSignering();
          logSkjemaStegFullført(avtale.uuid, 1);
        })}
      >
        <Avstand marginTop={5} marginBottom={5}>
          <Controller
            control={control}
            name="lest"
            rules={{
              validate(value) {
                return value || t('avtale.må_huke_av');
              },
            }}
            render={({ field }) => (
              <ConfirmationPanel
                error={errors.lest?.message}
                label={t('avtale.samtykke')}
                checked={field.value}
                {...field}
              />
            )}
          />
        </Avstand>
        <StyledAlert variant="info">{t('signering.videresendt')}</StyledAlert>
        <Knapper>
          <Button type="submit" loading={isSubmitting}>
            {t('avtale.inngå_avtale')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              navigate('/');
            }}
          >
            {t('felles.avbryt')}
          </Button>
        </Knapper>
      </form>
    </>
  );
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--a-spacing-3);
  justify-content: left;
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 1rem;
`;
