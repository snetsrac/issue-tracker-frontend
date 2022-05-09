import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';

export enum Permissions {
  READ_ISSUES = 'read:issues',
  SUBMIT_ISSUES = 'submit:issues',
  MODIFY_ISSUES = 'modify:issues',
  DELETE_ISSUES = 'delete:issues',
  ASSIGN_ISSUES = 'assign:issues',
  READ_USERS = 'read:users',
}

export default function usePermissions() {
  const [permissions, setPermissions] = useState<string[] | undefined>(
    undefined
  );
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const payload = jwt.decode(token, { complete: true })?.payload as {
            permissions: string[];
          };

          setPermissions(payload['permissions']);
        } catch {
          setPermissions(undefined);
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently]);

  return permissions;
}
