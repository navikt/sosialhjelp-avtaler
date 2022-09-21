import { Link, LinkProps } from '@navikt/ds-react'
import { logNavigering } from '../utils/amplitude'

export function DsLink(props: LinkProps) {
  const { href, children, ...rest } = props
  return (
    <Link
      onClick={() => {
        logNavigering(href!, children!.toString())
      }}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  )
}
