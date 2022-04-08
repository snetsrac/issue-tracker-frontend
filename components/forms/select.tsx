import { ReactNode } from 'react';
import Input, { InputProps } from './input';

type SelectProps<> = Omit<InputProps, 'children'> & {
  children: ReactNode;
  value: string;
  setValue: Function;
  required?: boolean;
  autoComplete?: string;
};

export default function Select({
  id,
  label,
  columns,
  children,
  value,
  setValue,
  required,
  autoComplete,
}: SelectProps) {
  return (
    <Input id={id} label={label} columns={columns}>
      <select
        id={id}
        name={id}
        autoComplete={autoComplete}
        className='block w-full rounded-md border-gray-300 capitalize shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm'
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={required}
      >
        {children}
      </select>
    </Input>
  );
}
