import { ComponentPropsWithoutRef } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps<T extends FieldValues>
  extends ComponentPropsWithoutRef<'select'> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  errors: FieldErrors<T>;
}

export default function Select<T extends FieldValues>({
  id,
  name,
  label,
  register,
  rules,
  errors,
  children,
}: InputProps<T>) {
  const hasError = !!errors[name];

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="font-semibold leading-6 text-[#000417]" htmlFor={id}>
          {label}
        </label>
      )}

      <div
        className={`flex items-center justify-between rounded-lg border ${hasError ? 'border-red-400' : 'border-[#c4c4c4]'} focus-within:${hasError ? 'border-red-400' : 'border-[#c4c4c4]'}`}
      >
        <select
          className="h-[50px] w-full rounded-lg px-[18px] py-[14px] outline-sub-purple"
          id={id}
          {...register(name, rules)}
        >
          {children}
        </select>
      </div>
    </div>
  );
}
