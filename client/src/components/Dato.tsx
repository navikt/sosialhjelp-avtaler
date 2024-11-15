export interface DatoProps {
  verdi?: string;
}

export function Dato(props: DatoProps) {
  const { verdi } = props;
  if (!verdi) {
    return null;
  }
  const randomId = `opprettet_dato_${Math.random().toString(36).substr(2, 9)}`;
  return <span id={randomId}>{formatter.format(new Date(verdi))}</span>;
}

const formatter = new Intl.DateTimeFormat('nb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});
