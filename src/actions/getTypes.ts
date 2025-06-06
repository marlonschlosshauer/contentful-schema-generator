"use server";

import { generateTypes } from "@/codegen";
import { z } from "zod";

export type GetTypesState =
  | { status: "idle" }
  | { status: "error"; message: string }
  | { status: "success"; output: string };

export type GetTypesProps = {
  token: string;
  spaceId: string;
  environmentId: string;
};

const schema = z.object({
  token: z.string(),
  spaceId: z.string(),
  environmentId: z.string(),
});

export const getTypes = async (
  _: GetTypesState,
  data: FormData,
): Promise<GetTypesState> => {
  const parse = schema.safeParse(Object.fromEntries(data.entries()));

  if (!parse.success) {
    throw new Error(parse.error.toString());
  }

  const { token, spaceId, environmentId } = parse.data;

  try {
    return {
      status: "success",
      output: await generateTypes([token, spaceId, environmentId]),
    };
  } catch (e: unknown) {
    if (typeof e === "string") {
      return {
        status: "error",
        message: e,
      };
    } else {
      return {
        status: "error",
        message: "An unknown error occured",
      };
    }
  }
};
