import { useAuth0 } from '@auth0/auth0-react';
import { LoginButton, LogoutButton} from "../exportedComponents"

const AuthenticationButton = () => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;