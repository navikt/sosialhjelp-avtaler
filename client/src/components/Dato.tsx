export interface DatoProps {
  verdi?: string
}

export function Dato(props: DatoProps) {
  const { verdi } = props
  if (!verdi) {
    return null
  }
  return <>{formatter.format(new Date(verdi))}</>
}

const formatter = new Intl.DateTimeFormat('nb', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})
