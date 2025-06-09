import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export default function Input({
  register,
  errors,
  name,
  label,
  placeholder,
}: {
  // @ts-expect-error TypeScript error due to generic type mismatch
  register: UseFormRegister;
  errors: FieldErrors;
  name: string;
  label: string;
  placeholder: string;
}) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <input
        {...register(name)}
        type="text"
        name={name}
        placeholder={placeholder}
        className="mt-1 text-slate-600 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
      />
      {errors[name] && (
        // @ts-expect-error TypeScript error due to generic type mismatch
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}
