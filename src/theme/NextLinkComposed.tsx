"use client"

import NextLink, { type LinkProps } from "next/link"
import { forwardRef, type AnchorHTMLAttributes } from "react"

type Props = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> &
    Omit<LinkProps, "href"> & { href: LinkProps["href"] }

/** Lets MUI components (Button, Link, Card, ListItemButton…) navigate with next/link. */
const NextLinkComposed = forwardRef<HTMLAnchorElement, Props>(
    function NextLinkComposed(props, ref) {
        return <NextLink ref={ref} {...props} />
    },
)

export default NextLinkComposed
