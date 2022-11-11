import { BodyLong, Heading, Panel } from '@navikt/ds-react';
import styled from 'styled-components';

const TopHeader = styled(Heading).attrs({ size: 'small', level: '3', spacing: true })``;
const SubHeader = styled(Heading).attrs({ size: 'small', level: '4', spacing: true })`
  margin-left: 1rem;
`;
const StyledList = styled.ul`
  margin-top: 0;
`;

export function Avtale() {
  return (
    <>
      <Panel border>
        <TopHeader>1. Formål og virkeområde</TopHeader>
        <BodyLong spacing>
          Kommunen og Arbeids- og velferdsdirektoratet inngår med dette en avtale om tilgjengeliggjøring av sentrale
          opplysninger om individuelle kommunale stønadssaker (sentrale stønadsopplysninger) fra kommunen til Arbeids-
          og velferdsetatens kontaktsentertjeneste (NKS). Avtalen beskriver stegene i tilgjengeliggjøringen, samt
          hvilken av partene som er ansvarlig for de ulike stegene.
        </BodyLong>
        <BodyLong spacing>
          Tilgjengeliggjøringen innebærer behandling av personopplysninger, der ansvaret endres underveis i prosessen
          for tilgjengeliggjøring. Målet med avtalen er å skape tydelighet og forutsigbarhet slik at
          tilgjengeliggjøringen håndteres til det beste for de registrerte, samt å sikre at tilgjengeliggjøringen skjer
          på en måte som ivaretar partenes forpliktelser.
        </BodyLong>
        <BodyLong spacing>
          NKS er en del av førstelinjen på telefon for henvendelser til NAV, inkludert for de kommunale tjenestene. For
          å gi veiledning har NKS adgang til informasjon om sentrale opplysningerom individuelle kommunale stønadssaker,
          jf. NAV-loven § 16 andre punktum. I rundskrivet til NAV-loven (R30-00) til § 16 andre punktum er dette per i
          dag definert som opplysninger om «konto- og adresseinformasjon, samt søknads- og vedtaksinformasjon om
          økonomisk sosialhjelp, kvalifiseringsprogram med kvalifiseringsstønad og midlertidig bolig». Opplysningene
          hentes fra kommunens fagsystem, og tilgjengeliggjøres for NKS ved behov. Partene er selvstendig
          behandlingsansvarlige for ulike behandlinger.
        </BodyLong>
        <BodyLong>
          <u>Avrensinger</u>
        </BodyLong>
        <BodyLong spacing>
          Avtalen regulerer ikke hvorvidt kommunen velger å tilgjengeliggjøre opplysninger eller ikke, men tydeliggjør
          ansvarsfordelingen etter at kommunen har valgt å koble seg til den digitale løsningen som gjør
          tilgjengeliggjøringen mulig.
        </BodyLong>
        <BodyLong spacing>
          Avtalen omhandler kun ansvarsfordelingen mellom kommunen og Arbeids- og velferdsdirektoratet. Det er partene
          som er behandlingsansvarlig for relevante steg i tilgjengeliggjøringen av opplysningene. I de tilfellene andre
          aktører opptrer på vegne av avtalens parter, må dette reguleres gjennom andre avtaler.
        </BodyLong>
        <TopHeader>2. Avtalens parter</TopHeader>
        <BodyLong spacing>Avtalens parter er kommunen og Arbeids- og velferdsdirektoratet.</BodyLong>
        <TopHeader>3. Praktisk gjennomføring og ansvarsfordeling</TopHeader>
        <SubHeader>3.1. Hvordan opplysningene blir tilgjengelig for NKS</SubHeader>
        <BodyLong spacing>
          Ansatte i NKS gis tilgang til opplysningene gjennom en digital løsning som Arbeids- og velferdsdirektoratet
          forvalter. Kommunen aktiverer selv data fra eget fagsystem via FIKS Konfigurasjon inn i denne løsningen. For
          nærmere beskrivelse, se punkt 10 i Veiviseren hos KS. Når kommunen har gjennomført aktivering, kan NKS gjøre
          oppslag og se informasjon om brukeren. De sentrale stønadsopplysningene om en bruker blir midlertidig
          tilgjengeliggjort for den ansatte i NKS når det gjøres oppslag basert på en henvendelse fra brukeren. Dette
          for at den ansatte i NKS skal kunne gi veiledning til brukeren basert på opplysningene.
        </BodyLong>
        <BodyLong spacing>
          Opplysningene lagres ikke i den digitale løsningen hos Arbeids- og velferdsdirektoratet etter at oppslaget er
          avsluttet, men mellomlagres underveis for å ikke sende nye kall hver gang den ansatte hos NKS beveger seg
          eller trykker i skjermbildet.
        </BodyLong>
        <SubHeader>3.2. Ansvarsfordeling</SubHeader>
        <BodyLong spacing>
          De sentrale stønadsopplysningene tilgjengeliggjøres midlertidig fra kommunens fagsystem slik at de blir
          tilgjengelige for ansatte ved NKS. Kommunen er ansvarlig for behandlingene av opplysningene i eget fagsystem.
        </BodyLong>
        <BodyLong spacing>
          Når opplysningene tilgjengeliggjøres, hentes de gjennom en digital løsning. Direktoratet er ansvarlig for
          behandlingene som skjer i den digitale løsningen. Formålet med behandlingene som skjer i den digitale
          løsningen for tilgjengeliggjøring, er at NKS skal kunne gi veiledning basert på opplysningene. Dette er en
          tjeneste som Arbeids- og velferdsdirektoratet er ansvarlig for. Direktoratet forvalter i tillegg den digitale
          løsningen.
        </BodyLong>
        <BodyLong spacing>
          Partene er ansvarlig for bruken av andre aktører innenfor eget ansvarsområde. Ansvarsområdet følger
          beskrivelsen over. Bruker kommunen en annen aktør slik at opplysningene fra eget fagsystem kan gjøres
          tilgjengelig, er kommunen ansvarlig for dette. Bruker Arbeids- og velferdsdirektoratet en annen aktør som en
          del av tilgjengeliggjøringen i den digitale løsningen, er direktoratet ansvarlig for dette.
        </BodyLong>
        <BodyLong>
          <u>Hva skal partene gjøre</u>
        </BodyLong>
        <BodyLong spacing>
          Med utgangspunkt i denne ansvarsfordelingen skal partene utføre følgende for å ivareta sitt ansvar:
        </BodyLong>
        <BodyLong spacing as="span">
          <i>Kommunen skal:</i>
          <StyledList>
            <li>
              ivareta personvernregelverket og andre rettslige forpliktelser innenfor eget ansvarsområde. Disse
              forpliktelsene følger av aktuelt regelverk, noen fullstendig redegjørelse av forpliktelsene er derfor ikke
              inkludert i avtalen
            </li>
            <li>tilgjengeliggjøre sentrale stønadsopplysninger gjennom å aktivere data fra eget fagsystem</li>
            <li>sikre at informasjonen som tilgjengeliggjøres i den digitale løsningen er korrekt og oppdatert</li>
            <li>
              tilrettelegge slik at det innenfor virkeområdet til denne avtalen kun er Arbeids- og velferdsdirektoratet
              som kan hente ut de sentrale stønadsopplysningene. Hvis tilretteleggingen skjer i regi av en annen aktør
              som gjør dette på vegne av kommunen, er kommunen ansvarlig for hvordan denne aktøren ivaretar dette.
            </li>
          </StyledList>
          <i>Arbeids-og velferdsdirektoratet skal:</i>
          <StyledList>
            <li>
              ivareta personvernregelverket og andre rettslige forpliktelser innenfor eget ansvarsområde. Disse
              forpliktelsene følger av aktuelt regelverk, noen fullstendig redegjørelse av forpliktelsene er derfor ikke
              inkludert i avtalen
            </li>
            <li>utvikle og forvalte digital løsning for tilgjengeliggjøring av sentrale stønadsopplysninger</li>
            <li>
              sikre tilstrekkelig tilgangskontroll i den digitale løsninger slik at kun ansatte med tjenstlig behov hos
              NKS har tilgang til de sentrale stønadsopplysningene. Tilgangskontrollen skal også ivareta krav knyttet
              til egne ansatte og personer med diskresjonskoder 6 og 7
            </li>
          </StyledList>
        </BodyLong>
        <TopHeader>4. Andre forhold</TopHeader>
        <SubHeader>4.1. Dialog mellom partene og kontaktinformasjon</SubHeader>
        <BodyLong spacing>
          Dialog mellom partene initieres ved behov. Dialog skal skje knyttet til hendelser beskrevet i punktene 4.2 til
          4.6 i denne avtalen.
        </BodyLong>
        <SubHeader>4.2. Kostnader og finansiell risiko</SubHeader>
        <BodyLong spacing>
          Partene dekker selv egne kostnader og finansiell risiko for å utføre oppgaver og plikter i henhold til denne
          avtalen. For Arbeids- og velferdsdirektoratet inkluderer dette kostnader knyttet til utvikling og forvaltning
          av digital løsning for tilgjengeliggjøring.
        </BodyLong>
        <SubHeader>4.3. Feil og avvikshåndtering</SubHeader>
        <BodyLong spacing>
          Dersom en av partene oppdager avvik eller mistenker uautorisert utveksling av opplysninger, uautorisert
          tilgang, eller misbruk av opplysninger, skal den annen part varsles om dette så raskt som mulig, og det skal
          iverksettes nødvendig tiltak.
        </BodyLong>
        <SubHeader>4.4. Mislighold av avtalen</SubHeader>
        <BodyLong spacing>
          Avtalen misligholdes når en part ikke følger opp sine plikter og sitt ansvar som følger av avtalen. Ved
          mislighold skal den som ønsker å gjøre misligholdet gjeldende innen rimelig tid meddele dette skriftlig til
          den andre parten. Den part som har misligholdt avtalen har rett og plikt til å utbedre forholdet innen rimelig
          tid.
        </BodyLong>
        <SubHeader> 4.5. Tvister</SubHeader>
        <BodyLong spacing>
          Dersom det oppstår tvist mellom partene om tolkningen eller rettsvirkningen av avtalen, skal tvisten søkes
          løst ved forhandlinger mellom partene.
        </BodyLong>
        <SubHeader> 4.6. Varighet</SubHeader>
        <BodyLong spacing>
          Avtalen trer i kraft fra to vilkår er oppfylt. For det første må begge parter ha underskrevet avtalen. For det
          andre må kommunen ha aktivert data fra eget fagsystem slik at disse er tilgjengelige i den digitale løsningen.
          Avtalen varer så lenge formålet og partsforholdet tilsier at avtalen gjelder. Nye partsforhold krever nye
          avtaler. Dersom det skjer endringer som får påvirkning for avtalens innhold eller gyldighet plikter partene å
          orientere hverandre så raskt som mulig. Hvis endringene medfører at avtalene skal termineres, plikter partene
          å samarbeide for å sikre at de registrerte og de aktuelle tjenestene ivaretas.
        </BodyLong>
      </Panel>
    </>
  );
}
