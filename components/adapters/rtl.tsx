'use client'

import { ReactNode, useEffect } from "react";
import createCache from "@emotion/cache";
import stylisRTLPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from "@emotion/react";
import PropTypes from "prop-types";

type Direction = 'ltr' | 'rtl';

const styleCache = () => createCache({
  key: 'rtl',
  prepend: true,
  stylisPlugins: [stylisRTLPlugin]
})

interface RTLProps {
  children: ReactNode;
  direction?: Direction;
}

export const RTL = ({children, direction = 'ltr'} : RTLProps) => {
  useEffect(() => {
    document.dir = direction;
  }, [direction]);


  if (direction === 'rtl') {
    return (
      <CacheProvider value={styleCache()}>
        {children}
      </CacheProvider>
    )
  }
  
  return <>{children}</>
}

RTL.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf<Direction>(['ltr', 'rtl'])
};
