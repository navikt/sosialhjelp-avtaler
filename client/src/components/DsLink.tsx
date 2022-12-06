import { Link, LinkProps } from '@navikt/ds-react';
import { logNavigering } from '../utils/amplitude';

export function DsLink(props: LinkProps) {
  const { href, children, ...rest } = props;
  return (
    <Link
      onClick={() => {
        //eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        logNavigering(href!, children!.toString());
      }}
      href={href}
      {...rest}
    >
      {children}
    </Link>
  );
}
