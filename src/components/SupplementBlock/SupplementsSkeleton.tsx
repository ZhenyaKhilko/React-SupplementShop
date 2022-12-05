import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    className="supplement-block"
    speed={2}
    width={280}
    height={584}
    viewBox="0 0 280 584"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="19" y="8" rx="17" ry="17" width="250" height="260" />
    <rect x="10" y="285" rx="15" ry="15" width="265" height="21" />
    <rect x="27" y="315" rx="15" ry="15" width="230" height="21" />
    <rect x="6" y="372" rx="15" ry="15" width="273" height="85" />
    <rect x="8" y="482" rx="6" ry="6" width="100" height="28" />
    <rect x="173" y="470" rx="25" ry="25" width="107" height="46" />
  </ContentLoader>
);
