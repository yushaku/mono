// To prevent data from being shared across users and requests,
// while still ensuring that the QueryClient is only created once per request,
// create a request-scoped singleton instance of the QueryClient.
//
import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

const getQueryClient = cache(() => new QueryClient());
export default getQueryClient;
