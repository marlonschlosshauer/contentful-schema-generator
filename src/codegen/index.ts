import { getClient } from "@/contentful/client";
import render from "./renderer/render";

export const generateTypes = async (options: Parameters<typeof getClient>) => {
  const client = getClient(...options);

  const [contentTypes, locales] = await Promise.all([
    client.getContentTypes(),
    client.getLocales(),
  ]);

  return await render(contentTypes.items, locales.items);
};
