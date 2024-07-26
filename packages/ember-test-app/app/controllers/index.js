import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class IndexController extends Controller {
  @service
  router;

  get routes() {
    const allRoutes = this.router.get(
      // eslint-disable-next-line ember/no-private-routing-service
      '_router._routerMicrolib.recognizer.names',
    );
    const excludeRoutes = ['loading', 'error', 'index', 'application'];
    const filteredRoutes = Object.keys(allRoutes)
      .sort()
      .filter((route) => {
        for (const excludeRoute of excludeRoutes) {
          if (route.endsWith(excludeRoute)) {
            return false;
          }
        }
        return true;
      });
    return filteredRoutes;
  }
}
