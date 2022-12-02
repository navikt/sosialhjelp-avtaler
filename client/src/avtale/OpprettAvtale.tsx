import { Alert, BodyLong, Button, ConfirmationPanel, Heading, ReadMore } from '@navikt/ds-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AppLink } from '../components/AppLink';
import { Avstand } from '../components/Avstand';
import { HentKommuneResponse, StartSigneringRequest } from '../types';
import { useGet } from '../api/useGet';
import { usePost } from '../api/usePost';
import { logLastNedAvtale, logSkjemaStartet, logSkjemaStegFullført } from '../utils/amplitude';
import { Avtale } from './Avtale';
import Spinner from '../components/Spinner';

export function OpprettAvtale() {
  const { t } = useTranslation();
  const { orgnr } = useParams<{ orgnr: string }>();
  const { data: kommune, error: kommuneError } = useGet<HentKommuneResponse>(`/avtale/${orgnr}`);
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ lest: boolean }>({
    defaultValues: {
      lest: false,
    },
  });
  const { post: startSignering, data: requestUrl } = usePost<StartSigneringRequest, string>('/avtale/signer');
  const navigate = useNavigate();

  useEffect(() => {
    if (orgnr) {
      logSkjemaStartet(orgnr);
    }
  }, [orgnr]);

  useEffect(() => {
    if (requestUrl) {
      window.location.href = requestUrl;
    }
  }, [requestUrl]);

  if (!kommune && !kommuneError) {
    return <Spinner />;
  }

  if (!kommune) {
    return null;
  }

  if (kommune.opprettet) {
    navigate('/opprett-avtale/kvittering', {
      state: kommune,
    });
    return null;
  }
  return (
    <main>
      <Heading level="2" size="medium" spacing>
        {t('avtale.opprett_avtale_for', { navn: kommune.navn })}
      </Heading>
      <BodyLong spacing>{t('avtale.ingress')}</BodyLong>
      <ReadMore header={t('personopplysninger.overskrift')}>{t('personopplysninger.detaljer')}</ReadMore>
      <Avstand marginTop={5} marginBottom={5}>
        <Avtale />
      </Avstand>
      <BodyLong spacing>
        <AppLink href="/Avtale.pdf" target="_blank" onClick={() => logLastNedAvtale(window.location.href)}>
          {t('avtale.lenke_last_ned_avtalen')}
        </AppLink>
      </BodyLong>
      <form
        onSubmit={handleSubmit(async (data) => {
          await startSignering({
            orgnr: kommune.orgnr,
          });
          logSkjemaStegFullført(kommune.orgnr, 1);
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
              >
                <BodyLong spacing>{t('avtale.bekreftelse.1')}</BodyLong>
                <BodyLong>{t('avtale.bekreftelse.2')}</BodyLong>
              </ConfirmationPanel>
            )}
          />
        </Avstand>
        <StyledAlert variant="info">{t('signering.videresendt')}</StyledAlert>
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
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
    </main>
  );
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  justify-content: left;
`;

const StyledAlert = styled(Alert)`
  margin-bottom: 1rem;
`;
