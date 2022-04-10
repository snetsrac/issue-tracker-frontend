import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import {
  Issue,
  IssuePriority,
  IssueStatus,
  useGetIssueQuery,
  useUpdateIssueMutation,
} from '../../../api';
import Form from '../../../components/forms/form';
import Select from '../../../components/forms/select';
import TextArea from '../../../components/forms/textArea';
import Text from '../../../components/forms/text';
import IssueMeta from '../../../components/issues/IssueMeta';
import Layout from '../../../components/layout';

export default function IssueUpdatePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const [issue, setIssue] = useState<Issue>({
    id: 0,
    title: '',
    description: '',
    status: IssueStatus.NULL,
    priority: IssuePriority.NULL,
  });

  const [isIssueLoaded, setIsIssueLoaded] = useState(false);

  const getIssue = useGetIssueQuery(id, true);

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
        title={issue.title.length > 0 ? issue.title : 'Update Issue'}
        description={
          issue.description.length > 0 ? (
            <IssueMeta issue={issue} />
          ) : (
            'Update an existing issue.'
          )
        }
        onSubmit={updateIssue.mutate}
        disabled={getIssue.isLoading || updateIssue.isLoading}
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

IssueUpdatePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};
