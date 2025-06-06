"use client";
import { FC, useId } from "react";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean;
}

export const Input: FC<InputProps> = ({ label, name, required }) => {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        required={required}
        type="text"
        className="border-2 border-solid border-sm"
      />
    </div>
  );
};
