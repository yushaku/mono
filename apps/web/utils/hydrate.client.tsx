'use client';

import { ReactQueryHydrator } from 'react-query/hydration';

function Hydrate(props) {
  return <ReactQueryHydrator {...props} />;
}

export default Hydrate;
