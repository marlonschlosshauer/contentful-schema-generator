import { getClient } from "@/contentful/client";
import render from "./renderer/render";

export const generateTypes = async (options: Parameters<typeof getClient>) => {
  const client = getClient(...options);

  const contentTypes = await client.getContentTypes();
  const locales = await client.getLocales();

  const output = await render(contentTypes.items, locales.items);

  return output;
};
