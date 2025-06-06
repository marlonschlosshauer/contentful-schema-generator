"use client";

import { getTypes, GetTypesState } from "@/actions/getTypes";
import { Input } from "@/components/Input";
import Link from "next/link";
import { useActionState, useEffect } from "react";

const base = {
  status: "idle",
} as GetTypesState;

export default function Home() {
  const [state, generate, loading] = useActionState(getTypes, base);

  useEffect(() => {
    if (state.status === "success") {
      const link = document.createElement("a");
      link.href = `data:application/octet-stream;base64,${btoa(state.output)}`;
      link.download = "contentful.ts";
      link.click();
    }
  }, [state]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-10 row-start-2 items-star max-w-2xl w-full">
        <section aria-label="Tool introduction" className="flex flex-col gap-2">
          <h1 className="text-2xl">
            Generate Typescript types from your Contentful Content-Types
          </h1>
          <p>
            Use this tool to generate types for your Contentful Application. All
            that you need is to enter your spaceId, environmentId and pass a
            valid{" "}
            <Link
              className="underline"
              href="https://www.contentful.com/developers/docs/references/authentication/?utm_source=webapp&utm_medium=knowledge-base-api_key&utm_campaign=in-app-help#the-delivery-and-preview-api"
              target="_blank"
            >
              Contentful API key
            </Link>
            . This is built upon{" "}
            <Link
              className="underline"
              href="https://github.com/intercom/contentful-typescript-codegen"
              target="_blank"
            >
              contentful-typescript-codegen
            </Link>{" "}
            which is a CLI tool that allows you to generate types from a config.
            If you would rather deploy this yourself or want to check out the
            source code, you can find the repository{" "}
            <Link
              className="underline"
              href="https://github.com/marlonschlosshauer/contentful-schema-generator"
              target="_blank"
            >
              here
            </Link>
            .
          </p>
        </section>
        <section aria-label="Inputs for the tool">
          <form action={generate} className="flex flex-col gap-4">
            <Input name="spaceId" label="Space Id" required />
            <Input name="environmentId" label="Environment Id¹" required />
            <Input name="token" label="API Key" required />
            <button
              type="submit"
              disabled={loading || state.status === "success"}
              className="bg-blue-500 text-white p-1 hover:bg-blue-600 disabled:bg-blue-900 disabled:cursor-not-allowed"
            >
              {state.status !== "success" ? "Download .ts file" : "Done"}
            </button>
            {state.status === "error" && (
              <p className="text-red-500" role="alert">
                {state.message}
              </p>
            )}
          </form>
        </section>
        <section aria-label="hints" className="flex flex-col gap-2">
          <hr className="border-blue-200" />
          <ul>
            <li>
              ¹ Make sure your API Key has access to the environment you want to
              generate types for.
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
