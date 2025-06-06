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
  try {
    const { token, spaceId, environmentId } = schema.parse(
      Object.fromEntries(data.entries()),
    );

    try {
      return {
        status: "success",
        output: await generateTypes([token, spaceId, environmentId]),
      };
    } catch {
      return {
        status: "error",
        message: "Error generating types",
      };
    }
  } catch {
    return {
      status: "error",
      message: "Missing props",
    };
  }
};
