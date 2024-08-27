import { ComponentPropsWithoutRef } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

interface InputProps<T extends FieldValues>
  extends ComponentPropsWithoutRef<'input'> {
  label?: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions<T, Path<T>>;
  errors: FieldErrors<T>;
}

export default function Input<T extends FieldValues>({
  id,
  name,
  type,
  placeholder,
  label,
  register,
  rules,
  errors,
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
        className={`flex items-center justify-between rounded-lg border px-4 py-[14px] ${hasError ? 'border-red-400' : 'border-[#8a8a8a]'} focus-within:${hasError ? 'border-red-400' : 'border-[#aaa]'}`}
      >
        <input
          className="w-full flex-initial border-none bg-white outline-none focus:border-[#aaa]"
          id={id}
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
        />
      </div>
    </div>
  );
}
