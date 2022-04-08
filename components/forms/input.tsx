import { ReactElement } from 'react';

export interface InputProps {
  id: string;
  label?: string;
  columns?: number;
  children: ReactElement;
}

export default function Text({ id, label, columns = 6, children }: InputProps) {
  return (
    <div className={`sm:col-span-${columns}`}>
      <label htmlFor={id} className='block text-sm font-medium text-gray-700'>
        {label || id[0].toUpperCase() + id.slice(1)}
      </label>
      <div className='mt-1'>{children}</div>
    </div>
  );
}
