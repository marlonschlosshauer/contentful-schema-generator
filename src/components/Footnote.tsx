import { FC, PropsWithChildren } from "react";

export interface FootnoteProps {
  note: string;
}

export const Footnote: FC<PropsWithChildren<FootnoteProps>> = ({
  note,
  children,
}) => {
  return (
    <p id={note}>
      <sup>{note}</sup> {children}
    </p>
  );
};
