import Input, { InputProps } from './input';

type TextAreaProps = Omit<InputProps, 'children'> & {
  value: any;
  setValue: Function;
  required?: boolean;
  autoComplete?: string;
};

export default function TextArea({
  id,
  label,
  columns,
  value,
  setValue,
  required,
  autoComplete,
}: TextAreaProps) {
  return (
    <Input id={id} label={label} columns={columns}>
      <textarea
        rows={4}
        name={id}
        id={id}
        autoComplete={autoComplete}
        className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm'
        value={value}
        onChange={(event) => setValue(event.target.value)}
        required={required}
      />
    </Input>
  );
}
