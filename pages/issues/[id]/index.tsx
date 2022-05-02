import { withAuthenticationRequired } from '@auth0/auth0-react';
import { BellIcon, PencilIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useGetIssueByIdQuery } from '../../../api/issues';
import { LinkButton } from '../../../components/button';
import { IssueAside } from '../../../components/issues/IssueAside';
import IssueMeta from '../../../components/issues/IssueMeta';
import { withLayout } from '../../../components/layout';

function IssuePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const result = useGetIssueByIdQuery(id);

  if (result.isLoading) {
    return <span>Loading...</span>;
  }

  if (result.isError || result.data === undefined) {
    return (
      <span>
        Error:{' '}
        {result.error instanceof Error
          ? result.error.message
          : 'Unknown error.'}
      </span>
    );
  }

  const issue = result.data;

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3'>
      <div className='xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8'>
        <div>
          <div>
            <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {issue.title}
                </h1>
                <IssueMeta issue={issue} />
              </div>
              <div className='mt-4 flex space-x-3 md:mt-0'>
                <LinkButton
                  href={`/issues/${id}/edit`}
                  type='white'
                  LeadingIcon={PencilIcon}
                  iconColor='gray-400'
                >
                  Edit
                </LinkButton>
                {/* <button
                  type='button'
                  className='inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
                >
                  <BellIcon
                    className='-ml-1 mr-2 h-5 w-5 text-gray-400'
                    aria-hidden='true'
                  />
                  <span>Subscribe</span>
                </button> */}
              </div>
            </div>
            <IssueAside className='mt-8 xl:hidden' issue={issue} />
            <div className='py-3 xl:pt-6 xl:pb-0'>
              <h2 className='sr-only'>Description</h2>
              <div className='prose max-w-none space-y-4'>
                {issue.description.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <IssueAside className='hidden xl:block xl:pl-8' issue={issue} />
    </div>
  );
}

export default withAuthenticationRequired(withLayout(IssuePage));
