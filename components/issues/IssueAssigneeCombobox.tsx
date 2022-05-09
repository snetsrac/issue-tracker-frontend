import { Combobox as HeadlessUiCombobox } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import { User } from '../../api/users';
import { classNames } from '../table/table';

type ComboboxProps = {
  allUsers: User[];
  selectedUsers: User[];
  setSelectedUsers: (users: User[]) => void;
  label: string;
};

export default function IssueAssigneeCombobox({
  allUsers,
  selectedUsers,
  setSelectedUsers,
  label,
}: ComboboxProps) {
  const [query, setQuery] = useState('');

  const filteredUsers =
    query === ''
      ? allUsers
      : allUsers.filter((user) => {
          return (
            user.name.toLowerCase().includes(query.toLowerCase()) ||
            user.username.toLowerCase().includes(query.toLowerCase())
          );
        });

  return (
    <HeadlessUiCombobox
      as='div'
      className='mt-6'
      value={selectedUsers}
      onChange={setSelectedUsers}
      multiple
    >
      <HeadlessUiCombobox.Label className='block text-sm font-medium text-gray-700'>
        {label}
      </HeadlessUiCombobox.Label>
      <div className='relative mt-1'>
        <HeadlessUiCombobox.Input
          className='w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-200 sm:text-sm'
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(value: User) => value.name}
        />
        <HeadlessUiCombobox.Button className='absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none disabled:cursor-not-allowed'>
          <SelectorIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </HeadlessUiCombobox.Button>

        {filteredUsers.length > 0 && (
          <HeadlessUiCombobox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
            {filteredUsers.map((user) => (
              <HeadlessUiCombobox.Option
                key={user.id}
                value={user}
                className={({ active }) =>
                  classNames(
                    'relative cursor-pointer select-none py-2 pl-3 pr-9',
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className='flex items-center'>
                      <span
                        className={classNames(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {user.name}
                      </span>
                      <span
                        className={classNames(
                          'ml-2 truncate italic text-gray-500',
                          active ? 'text-indigo-200' : 'text-gray-500'
                        )}
                      >
                        {user.username}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-indigo-600'
                        )}
                      >
                        <CheckIcon className='h-5 w-5' aria-hidden='true' />
                      </span>
                    )}
                  </>
                )}
              </HeadlessUiCombobox.Option>
            ))}
          </HeadlessUiCombobox.Options>
        )}
      </div>
    </HeadlessUiCombobox>
  );
}
