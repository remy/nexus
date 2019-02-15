import React from 'react';
import Loadable from 'react-loadable';

const loading = () => <div>Loading…</div>;

export const OpenUrl = Loadable({
  loader: () => import('./components/OpenUrl'),
  loading,
});

export const InfoPanel = Loadable({
  loader: () => import('./components/InfoAbout'),
  loading,
});

export const StyleEditor = Loadable({
  loader: () => import('./components/StyleEditor'),
  loading,
});
