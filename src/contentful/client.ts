import { createClient } from "contentful";

export const getClient = (
  token: string,
  spaceId: string,
  environmentId: string,
  draft?: boolean,
) => {
  return createClient({
    space: spaceId,
    environment: environmentId,
    accessToken: token,
    host: draft ? "preview.contentful.com" : "cdn.contentful.com",
  });
};
