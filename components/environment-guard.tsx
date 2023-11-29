'use client'

import {ReactNode} from "react";

const currentEnvironment = process.env.NEXT_PUBLIC_ENV;

type Environment = 'development' | 'production';

interface DevelopmentGuard {
  environment?: Environment;
  children?: ReactNode;
}

export const EnvironmentGuard = ({ environment = 'development', children }: DevelopmentGuard) => {
  if (currentEnvironment === environment) {
    return <>{children}</>
  }

  return null
}
