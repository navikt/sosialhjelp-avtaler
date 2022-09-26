import { BodyShort, Button, Heading, TextField } from '@navikt/ds-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Avstand } from '../components/Avstand'
import { validerEpost } from './epost'
import { HentVirksomhetResponse, OppdaterAvtaleRequest, OppdaterAvtaleResponse } from '../types'
import { useGet } from '../api/useGet'
import { usePut } from '../api/usePut'
import { logSkjemaFullført, skjemanavn } from '../utils/amplitude'

export function OppdaterAvtale() {
  const { t } = useTranslation()
  const { orgnr } = useParams<{ orgnr: string }>()
  const { data: virksomhet } = useGet<HentVirksomhetResponse>(`/avtale/virksomheter/${orgnr}`)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<{ epost: string }>({
    defaultValues: {
      epost: '',
    },
  })
  const { put: endreAvtale, data: avtale } = usePut<OppdaterAvtaleRequest, OppdaterAvtaleResponse>(
    `/avtale/virksomheter/${orgnr}`
  )

  useEffect(() => {
    if (virksomhet) {
      reset({ epost: virksomhet.epost })
    }
  }, [virksomhet])

  const navigate = useNavigate()
  useEffect(() => {
    if (avtale) {
      navigate('/')
    }
  }, [avtale])
  if (!virksomhet) {
    return null
  }

  return (
    <main>
      <Heading level="2" size="medium" spacing>
        {t('avtale.endre', { navn: virksomhet.navn })}
      </Heading>
      <BodyShort spacing>{t('avtale.endre_orgnr', { orgnr: virksomhet.orgnr })}</BodyShort>
      <form
        onSubmit={handleSubmit(async (data) => {
          await endreAvtale({
            epost: data.epost,
          })
          logSkjemaFullført(virksomhet?.orgnr, skjemanavn.SKJEMANAVN_ENDRE)
        })}
      >
        <Tekstfelt
          label={t('ledetekst.epost')}
          error={errors.epost?.message}
          {...register('epost', {
            validate(epost) {
              return validerEpost(epost) ? true : t('felles.ugyldig_epost')
            },
          })}
        />
        <Avstand marginBottom={5} />
        <Knapper>
          <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>
            {t('felles.lagre')}
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              navigate('/')
            }}
          >
            {t('felles.avbryt')}
          </Button>
        </Knapper>
      </form>
    </main>
  )
}

const Knapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: var(--navds-spacing-3);
  justify-content: left;
`

const Tekstfelt = styled(TextField)`
  max-width: 330px;
`
