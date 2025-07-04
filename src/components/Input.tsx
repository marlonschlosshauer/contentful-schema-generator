"use client";
import { FC, useId } from "react";

export interface InputProps {
  name: string;
  label: string;
  required?: boolean;
  defaultValue?: string;
}

export const Input: FC<InputProps> = ({ label, ...props }) => {
  const id = useId();
  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type="text"
        className="border-2 border-solid rounded-sm border-blue-200"
        {...props}
      />
    </div>
  );
};
