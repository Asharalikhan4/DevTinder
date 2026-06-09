"use client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { getQueryClient } from "@/utils/getQueryClient";

export default function CustomQueryClientProvider({ children }: { children: React.ReactNode }) {
  // NOTE: Avoid useState when initializing the query client if you are
  // using the getQueryClient singleton function pattern above.
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
