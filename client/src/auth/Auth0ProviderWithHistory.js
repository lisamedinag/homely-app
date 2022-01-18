import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import history from "../history";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = "dev-djvna28t.us.auth0.com";
  const clientId = "jjQlIfLFhsRj4v90Qw22ZJNP4cf0XGa8";

  // const history = useHistory();

  const onRedirectCallback = (appState) => {
    history.push(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;
