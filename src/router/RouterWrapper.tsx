import { useRoutes } from 'react-router-dom';

import routes from './index';

export default function RouteWrapper() {
  //   const routes = useRoutes(ProtectedRoutes[getUserType()]);
  const route = useRoutes(routes);

  return route;
}