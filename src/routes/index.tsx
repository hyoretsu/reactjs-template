import React, { Suspense} from 'react';
import { Switch, Route } from 'react-router-dom';

import Loading from '../pages/Loading';
import Error from '../pages/Error';

const Routes: React.FC = () => (
 <Suspense fallback={Loading}>
  <Switch>
   <Route component={Error} />
  </Switch>
 </Suspense>
);

export default Routes;
