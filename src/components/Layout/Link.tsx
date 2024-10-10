import * as React from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import MuiLink, { LinkProps as MuiLinkProps } from '@mui/material/Link';
import { Theme, styled } from '@mui/material/styles';

// Add support for the sx prop for consistency with the other branches.

const Anchor = styled('a')(({ theme }: { theme: Theme }) => ({
    color: `${theme.palette.text.primary} !important`,
    textDecoration: 'none',
    padding: '0.7em 0',
    '&:hover': {
        textDecorationColor: 'transparent !important',
        color: `${theme.palette.primary} !important`
    },
    '&.active': {
        color: `${theme.palette.text.secondary} !important`,
        borderBottom: `3px solid ${theme.palette.text.secondary}`
    }
}));

interface NextLinkComposedProps
    extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>,
        Omit<NextLinkProps, 'href' | 'as' | 'passHref' | 'onMouseEnter' | 'onClick' | 'onTouchStart'> {
    to: NextLinkProps['href'];
    linkAs?: NextLinkProps['as'];
}

export const NextLinkComposed = React.forwardRef<HTMLAnchorElement, NextLinkComposedProps>((props, ref) => {
    const { to, linkAs, replace, scroll, shallow, prefetch, legacyBehavior = true, locale, ...other } = props;

    return (
        <NextLink
            href={to}
            prefetch={prefetch}
            as={linkAs}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref
            locale={locale}
            legacyBehavior={legacyBehavior}
        >
            <Anchor ref={ref} {...other} />
        </NextLink>
    );
});

NextLinkComposed.displayName = 'NextLinkComposed';

export type LinkProps = {
    activeClassName?: string;
    as?: NextLinkProps['as'];
    href: NextLinkProps['href'];
    linkAs?: NextLinkProps['as']; // Useful when the as prop is shallow by styled().
    noLinkStyle?: boolean;
    disableActive?: boolean;
} & Omit<NextLinkComposedProps, 'to' | 'linkAs' | 'href'> &
    Omit<MuiLinkProps, 'href'>;

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/pages/api-reference/components/link
const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
    const {
        activeClassName = 'active',
        as,
        className: classNameProps,
        href,
        legacyBehavior,
        linkAs: linkAsProp,
        locale,
        noLinkStyle,
        prefetch,
        replace,
        role, // Link don't have roles.
        scroll,
        shallow,
        disableActive,
        ...other
    } = props;

    const router = useRouter();
    const pathname = typeof href === 'string' ? href : href.pathname;

    const className = clsx(classNameProps, {
        // [activeClassName]: router.asPath.split('/').slice(-1) === pathname.split('/').slice(-1) && activeClassName
        // [activeClassName]: !disableActive && router.asPath === pathname && activeClassName
    });

    const linkAs = linkAsProp || as;
    const nextjsProps = {
        to: href,
        linkAs,
        replace,
        scroll,
        shallow,
        prefetch,
        legacyBehavior,
        locale
    };

    if (noLinkStyle) {
        return <NextLinkComposed className={className} ref={ref} {...nextjsProps} {...other} />;
    }

    return (
        <MuiLink
            component={NextLinkComposed}
            sx={{
                textDecoration: 'none',
                '&:hover': {
                    color: 'primary.main'
                }
            }}
            ref={ref}
            {...nextjsProps}
            {...other}
        />
    );
});

Link.displayName = 'Link';

export default Link;
