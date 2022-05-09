import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  IssueCreation,
  IssuePriority,
  useCreateIssueMutation,
} from '../../api/issues';
import usePermissions, { Permissions } from '../../api/usePermissions';
import Form from '../../components/forms/form';
import Select from '../../components/forms/select';
import Text from '../../components/forms/text';
import TextArea from '../../components/forms/textArea';
import { withLayout } from '../../components/layout/layout';

function IssueCreatePage() {
  const router = useRouter();
  const permissions = usePermissions();

  const [issue, setIssue] = useState<IssueCreation>({
    title: '',
    description: '',
    priority: IssuePriority.NULL,
  });

  const createIssue = useCreateIssueMutation();

  if (
    permissions !== undefined &&
    !permissions.includes(Permissions.SUBMIT_ISSUES)
  ) {
    router.replace('/issues');
  }

  if (createIssue.isSuccess) {
    router.push(`/issues/${createIssue.data.id}`);
  }

  return (
    <div className='mx-auto max-w-xl px-4 sm:px-6 lg:px-8'>
      <Form
        title='Create Issue'
        description='Open a new issue ticket.'
        onSubmit={() => createIssue.mutate(issue)}
        disabled={createIssue.isLoading}
        isLoading={createIssue.isLoading}
        error={createIssue.error}
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

export default withAuthenticationRequired(withLayout(IssueCreatePage));
