"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

interface QueryClientProviderAdapterProps {
  children?: ReactNode;
}

const queryClient = new QueryClient();

export const QueryClientProviderAdapter = ({
  children,
}: QueryClientProviderAdapterProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false}/>
      {children}
    </QueryClientProvider>
  );
};
