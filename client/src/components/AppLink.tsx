import { Link, LinkProps } from '@navikt/ds-react'
import { baseUrl } from '../api/http'

export function AppLink(props: LinkProps) {
  const { href, children, ...rest } = props
  return (
    <Link href={baseUrl(href || '')} {...rest}>
      {children}
    </Link>
  )
}
