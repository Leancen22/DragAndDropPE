import { useSession, signIn } from 'next-auth/client';
import { useEffect } from 'react';

const withAuth = (WrappedComponent, accessLevel) => {
    return (props) => {
        const [session, loading] = useSession();

        useEffect(() => {
            if (!loading && !session && accessLevel === 'authenticated') {
                signIn();
            }
        }, [loading, session]);

        if (loading || (!session && accessLevel === 'authenticated')) {
            return <div>Loading...</div>;
        }

        return <WrappedComponent {...props} />;
    };
};

export default withAuth;
