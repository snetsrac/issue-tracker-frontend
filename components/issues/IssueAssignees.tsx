import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Issue, useUpdateIssueMutation } from '../../api/issues';
import usePermissions, { Permissions } from '../../api/usePermissions';
import { useGetAllUserSummariesQuery } from '../../api/users';
import { Avatar } from '../ui/avatar';
import Shimmer from '../ui/shimmer';
import IssueAssigneeCombobox from './IssueAssigneeCombobox';

type IssueAssigneesProps = {
  id: string;
  issue: Issue | undefined;
};

export default function IssueAssignees({ id, issue }: IssueAssigneesProps) {
  const permissions = usePermissions();
  const getAllUsers = useGetAllUserSummariesQuery();
  const [disabled, setDisabled] = useState(false);

  const initialSelectedUsers = useMemo(
    () =>
      getAllUsers.data?.content.filter((user) =>
        issue?.assignees.map((assignee) => assignee.id).includes(user.id)
      ) || [],
    [issue, getAllUsers.data?.content]
  );

  const [selectedUsers, setSelectedUsers] = useState(initialSelectedUsers);

  useEffect(() => {
    setSelectedUsers(initialSelectedUsers);
  }, [initialSelectedUsers]);

  const updateIssue = useUpdateIssueMutation(id);

  return (
    <div>
      <h2 className='text-sm font-medium text-gray-500'>Assignees</h2>
      {issue === undefined ? (
        <>
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
          <Shimmer className='mt-3 h-9 w-40 text-sm' />
        </>
      ) : issue.assignees.length === 0 ? (
        <div className='mt-3 ml-6 flex h-9 items-center text-sm italic text-gray-400'>
          No assignees
        </div>
      ) : (
        issue.assignees.map((assignee) => (
          <Link key={assignee.username} href={`/users/${assignee.username}`}>
            <a className='group mt-3 flex items-center space-x-3'>
              <Avatar src={assignee.picture} height={36} alt={assignee.name} />
              <span className='text-sm font-medium text-gray-900 group-hover:text-gray-500'>
                {assignee.name}
              </span>
            </a>
          </Link>
        ))
      )}
      {issue !== undefined &&
        getAllUsers.isSuccess &&
        permissions?.includes(Permissions.ASSIGN_ISSUES) && (
          <fieldset disabled={disabled}>
            <IssueAssigneeCombobox
              allUsers={getAllUsers.data.content}
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
              label='Assign users'
            />
            <button
              className='mt-3 w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-500'
              onClick={() => {
                setDisabled(true);
                updateIssue.mutate({
                  title: issue.title,
                  description: issue.description,
                  status: issue.status,
                  priority: issue.priority,
                  assigneeIds: selectedUsers.map((user) => user.id),
                });
                setDisabled(false);
              }}
            >
              Save assignments
            </button>
          </fieldset>
        )}
    </div>
  );
}
