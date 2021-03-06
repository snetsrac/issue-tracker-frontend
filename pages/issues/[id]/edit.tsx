import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  IssuePriority,
  IssueStatus,
  IssueUpdate,
  useGetIssueByIdQuery,
  useUpdateIssueMutation,
} from '../../../api/issues';
import usePermissions, { Permissions } from '../../../api/usePermissions';
import Form from '../../../components/forms/form';
import Select from '../../../components/forms/select';
import Text from '../../../components/forms/text';
import TextArea from '../../../components/forms/textArea';
import IssueMeta from '../../../components/issues/IssueMeta';
import { withLayout } from '../../../components/layout/layout';

function IssueUpdatePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { user } = useAuth0();
  const permissions = usePermissions();

  const [issueUpdate, setIssueUpdate] = useState<IssueUpdate>({
    title: '',
    description: '',
    status: IssueStatus.NULL,
    priority: IssuePriority.NULL,
    assigneeIds: [],
  });

  const [isIssueLoaded, setIsIssueLoaded] = useState(false);

  const getIssue = useGetIssueByIdQuery(id);

  const updateIssue = useUpdateIssueMutation(id);

  if (
    permissions !== undefined &&
    !permissions.includes(Permissions.MODIFY_ISSUES) &&
    getIssue.isSuccess &&
    getIssue.data.submitter?.id !== user?.sub
  ) {
    router.replace(`/issues/${id}`);
  }

  if (!isIssueLoaded && getIssue.isSuccess) {
    setIssueUpdate({
      title: getIssue.data.title,
      description: getIssue.data.description,
      status: getIssue.data.status,
      priority: getIssue.data.priority,
      assigneeIds: getIssue.data.assignees.map((user) => user.id),
    });
    setIsIssueLoaded(true);
  }

  if (updateIssue.isSuccess) {
    router.push(`/issues/${id}`);
  }

  return (
    <div className='mx-auto max-w-xl px-4 sm:px-6 lg:px-8'>
      <Form
        title={getIssue.data?.title ? getIssue.data.title : 'Update Issue'}
        description={
          getIssue.data !== undefined ? (
            <IssueMeta issue={getIssue.data} />
          ) : (
            'Update an existing issue.'
          )
        }
        onSubmit={() => updateIssue.mutate(issueUpdate)}
        disabled={
          getIssue.isLoading || getIssue.isError || updateIssue.isLoading
        }
        isLoading={getIssue.isLoading || updateIssue.isLoading}
        error={getIssue.error || updateIssue.error}
      >
        <Text
          id='title'
          value={issueUpdate.title}
          setValue={(title: string) =>
            setIssueUpdate({ ...issueUpdate, title })
          }
          required
        />
        <TextArea
          id='description'
          value={issueUpdate.description}
          setValue={(description: string) =>
            setIssueUpdate({ ...issueUpdate, description })
          }
          required
        />
        <Select
          id='status'
          value={issueUpdate.status}
          setValue={(status: IssueStatus) =>
            setIssueUpdate({ ...issueUpdate, status })
          }
          required
        >
          {Object.values(IssueStatus).map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
        <Select
          id='priority'
          value={issueUpdate.priority}
          setValue={(priority: IssuePriority) =>
            setIssueUpdate({ ...issueUpdate, priority })
          }
          required
        >
          {Object.values(IssuePriority).map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
      </Form>
    </div>
  );
}

export default withAuthenticationRequired(withLayout(IssueUpdatePage));
