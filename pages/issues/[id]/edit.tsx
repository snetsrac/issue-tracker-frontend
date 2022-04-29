import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  IssuePriority,
  IssueStatus,
  IssueUpdate,
  useGetIssueByIdQuery,
  useUpdateIssueMutation,
} from '../../../api/issues';
import Form from '../../../components/forms/form';
import Select from '../../../components/forms/select';
import Text from '../../../components/forms/text';
import TextArea from '../../../components/forms/textArea';
import IssueMeta from '../../../components/issues/IssueMeta';
import { withLayout } from '../../../components/layout';

function IssueUpdatePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const [issue, setIssue] = useState<IssueUpdate>({
    title: '',
    description: '',
    status: IssueStatus.NULL,
    priority: IssuePriority.NULL,
    assignees: [],
  });

  const [isIssueLoaded, setIsIssueLoaded] = useState(false);

  const getIssue = useGetIssueByIdQuery(id);

  const updateIssue = useUpdateIssueMutation(id, issue);

  if (!isIssueLoaded && getIssue.isSuccess) {
    setIssue(getIssue.data);
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
        onSubmit={() => updateIssue.mutate(issue)}
        disabled={
          getIssue.isLoading || getIssue.isError || updateIssue.isLoading
        }
        isLoading={getIssue.isLoading || updateIssue.isLoading}
        error={getIssue.error || updateIssue.error}
      >
        <Text
          id='title'
          value={issue.title}
          setValue={(title: string) => setIssue({ ...issue, title })}
          required
        />
        <TextArea
          id='description'
          value={issue.description}
          setValue={(description: string) =>
            setIssue({ ...issue, description })
          }
          required
        />
        <Select
          id='status'
          value={issue.status}
          setValue={(status: IssueStatus) => setIssue({ ...issue, status })}
          required
        >
          {Object.values(IssueStatus).map((value) => (
            <option key={value}>{value}</option>
          ))}
        </Select>
        <Select
          id='priority'
          value={issue.priority}
          setValue={(priority: IssuePriority) =>
            setIssue({ ...issue, priority })
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
