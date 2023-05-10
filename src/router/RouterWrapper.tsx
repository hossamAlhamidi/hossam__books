import { useRoutes } from 'react-router-dom';

import routes from './index';

export default function RouteWrapper() {
  const route = useRoutes(routes);
  return route;
}