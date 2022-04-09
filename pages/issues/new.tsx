import { useRouter } from 'next/router';
import { ReactElement, useState } from 'react';
import { IssueNew, IssuePriority, useCreateIssueMutation } from '../../api';
import Form from '../../components/forms/form';
import Select from '../../components/forms/select';
import Text from '../../components/forms/text';
import TextArea from '../../components/forms/textArea';
import Layout from '../../components/layout';

export default function IssueCreatePage() {
  const router = useRouter();

  const [issue, setIssue] = useState<IssueNew>({
    title: '',
    description: '',
    priority: IssuePriority.NULL,
  });

  const createIssue = useCreateIssueMutation(issue);

  if (createIssue.isSuccess) {
    router.push(`/issues/${createIssue.data.id}`);
  }

  return (
    <div className='mx-auto max-w-xl px-4 sm:px-6 lg:px-8'>
      <Form
        title='Create New Issue'
        description='Open a new issue.'
        onSubmit={createIssue.mutate}
        disabled={createIssue.isLoading}
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

IssueCreatePage.getLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>;
};