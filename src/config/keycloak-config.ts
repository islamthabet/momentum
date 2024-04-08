import Keycloak from 'keycloak-js';

const keycloakConfig: Keycloak.KeycloakConfig = {
  url: 'http://localhost:8080/auth',
  realm: 'test',
  clientId: 'test',
};

const keycloak: Keycloak = new Keycloak(keycloakConfig);

export default keycloak;
