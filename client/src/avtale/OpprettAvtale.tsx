import { Alert, BodyLong, Button, ConfirmationPanel, Heading, TextField } from '@navikt/ds-react';
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
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude';
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
      <BodyLong>{t('avtale.ingress')}</BodyLong>
      <Avstand marginTop={5} marginBottom={5}>
        <Avtale />
      </Avstand>

      <form
        onSubmit={handleSubmit(async (data) => {
          await startSignering({
            orgnr: kommune.orgnr,
          });
          logSkjemaFullført(kommune?.orgnr, skjemanavn.SKJEMANAVN_OPPRETT);
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
                label={t('avtale.bekreftelse')}
                checked={field.value}
                {...field}
              />
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
