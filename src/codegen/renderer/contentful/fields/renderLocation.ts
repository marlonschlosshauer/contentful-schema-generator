import { Field } from "contentful";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function renderLocation(field: Field): string {
  return "{ lat: number, lon: number }";
}
