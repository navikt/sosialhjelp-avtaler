export interface DatoProps {
  verdi?: string;
}

export function Dato(props: DatoProps) {
  const { verdi } = props;
  if (!verdi) {
    return null;
  }
  return <span id={'opprettet_dato'}>{formatter.format(new Date(verdi))}</span>;
}

const formatter = new Intl.DateTimeFormat('nb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
