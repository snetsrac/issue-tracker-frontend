import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { BellIcon, PencilIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useGetIssueByIdQuery } from '../../../api/issues';
import usePermissions, { Permissions } from '../../../api/usePermissions';
import { IssueAside } from '../../../components/issues/IssueAside';
import IssueDescription from '../../../components/issues/IssueDescription';
import IssueMeta from '../../../components/issues/IssueMeta';
import { withLayout } from '../../../components/layout/layout';
import { LinkButton } from '../../../components/ui/button';
import PageTitle from '../../../components/ui/pageTitle';

function IssuePage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { user } = useAuth0();
  const permissions = usePermissions();

  const { isError, error, data: issue } = useGetIssueByIdQuery(id);

  if (isError) {
    return (
      <span>
        Error: {error instanceof Error ? error.message : 'Unknown error.'}
      </span>
    );
  }

  return (
    <div className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 xl:grid xl:max-w-5xl xl:grid-cols-3'>
      <div className='xl:col-span-2 xl:border-r xl:border-gray-200 xl:pr-8'>
        <div>
          <div>
            <div className='md:flex md:items-center md:justify-between md:space-x-4 xl:border-b xl:pb-6'>
              <div>
                <PageTitle title={issue?.title} />
                <IssueMeta issue={issue} />
              </div>
              <div className='mt-4 flex space-x-3 md:mt-0'>
                {permissions.includes(Permissions.MODIFY_ISSUES) ||
                  (issue?.submitter?.id === user?.sub && (
                    <LinkButton
                      href={`/issues/${id}/edit`}
                      type='white'
                      LeadingIcon={PencilIcon}
                      iconColor='gray-400'
                    >
                      Edit
                    </LinkButton>
                  ))}
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
            <IssueDescription description={issue?.description} />
          </div>
        </div>
      </div>
      <IssueAside className='hidden xl:block xl:pl-8' issue={issue} />
    </div>
  );
}

export default withAuthenticationRequired(withLayout(IssuePage));
