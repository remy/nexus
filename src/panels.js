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

export const LinkHelp = Loadable({
  loader: () => import('./components/LinkHelp'),
  loading,
});

export const NewDocHelp = Loadable({
  loader: () => import('./components/NewDocHelp'),
  loading,
});

export const BrowserNav = Loadable({
  loader: () => import('./components/BrowserNav'),
  loading,
});

export const SaveFile = Loadable({
  loader: () => import('./components/SaveFile'),
  loading,
});

export const NewFile = Loadable({
  loader: () => import('./components/NewFile'),
  loading,
});

export const OpenFile = Loadable({
  loader: () => import('./components/OpenFile'),
  loading,
});

export const PromptClose = Loadable({
  loader: () => import('./components/PromptClose'),
  loading,
});

export const Search = Loadable({
  loader: () => import('./components/Search'),
  loading,
});

export const NavigateHelp = Loadable({
  loader: () => import('./components/NavigateHelp'),
  loading,
});
