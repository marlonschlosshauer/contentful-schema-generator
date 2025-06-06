"use client";

import { getTypes, GetTypesState } from "@/actions/getTypes";
import { Input } from "@/components/Input";
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
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <form action={generate} className="flex flex-col gap-4">
          <Input name="spaceId" label="Space Id" required />
          <Input name="environmentId" label="Environment Id" required />
          <Input name="token" label="CMA Token" required />
          <button
            type="submit"
            disabled={loading || state.status === "success"}
            className="bg-blue-500 text-white p-1 hover:bg-blue-600"
          >
            {state.status === "success" ? "Submit" : "Done"}
          </button>
        </form>
        <br />
      </main>
    </div>
  );
}
