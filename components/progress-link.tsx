'use client'

import {MouseEvent} from "react";
import {LinkProps} from 'next/link'
import {Link} from 'next-intl'
import {CSSProperties, ReactNode, useEffect} from "react";
import NProgress from 'nprogress'

interface ProgressLinkProps extends LinkProps {
  children: ReactNode,
  tabIndex?: number;
  style?: CSSProperties;
}

export const ProgressLink = ({
                               href,
                               tabIndex,
                               style,
                               children
                             }: ProgressLinkProps) => {


  useEffect(() => {
    return () => {
      NProgress.done()
    }
  }, [])

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    // Do not start animation when opening new tab
    if (e.ctrlKey) {
      return
    }

    NProgress.start()
  }

  return (
    <Link
      onClick={handleClick}
      href={href}
      tabIndex={tabIndex}
      style={style}
    >
      {children}
    </Link>
  )
}
