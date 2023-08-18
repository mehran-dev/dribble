import React from "react";

type Props = {
  title: string;
  state: string;
  placeholder: string;
  setState: (value: string) => void;
  type?: string;
  isTextArea?: boolean;
};

export default function FormField({
  title,
  state,
  placeholder,
  setState,
  type,
  isTextArea,
}: Props) {
  return (
    <div className="flexStart flex-col w-full gap-4">
      <label className="w-full text-gray-100">{title}</label>
      {isTextArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className="form_field-input"
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input type={type || "text"} placeholder={placeholder} value={state} />
      )}
    </div>
  );
}
