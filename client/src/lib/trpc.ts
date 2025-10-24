import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/routers";

export const trpc = createTRPCReact<AppRouter>();

// Default query options for better performance
export const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 minutes - data stays fresh
  cacheTime: 10 * 60 * 1000, // 10 minutes - cache retention
  refetchOnWindowFocus: false, // Don't refetch on window focus
  refetchOnMount: false, // Don't refetch on component mount if data exists
  retry: 1, // Only retry once on failure
};

