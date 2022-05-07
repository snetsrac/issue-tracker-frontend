import { withAuthenticationRequired } from '@auth0/auth0-react';
import { useRouter } from 'next/router';
import { useGetUserByUsernameQuery } from '../../../api/users';
import { withLayout } from '../../../components/layout/layout';

function UserPage() {
  const router = useRouter();
  const username = router.query.username as string;

  const result = useGetUserByUsernameQuery(username);

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

  const user = result.data;

  return (
    <div>
      <p>{user.id}</p>
      <p>{user.email}</p>
      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.picture}</p>
    </div>
  );
}

export default withAuthenticationRequired(withLayout(UserPage));
