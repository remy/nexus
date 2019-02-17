export function next({ active, add }) {
  if (!active.ref) return;
  const link = active.ref.current.next();
  if (link) {
    add({ type: 'url', id: link, referrer: active.ref.current.getReferrer() });
  } else {
    // put the current first in focus
  }
}

export function previous({ active, add }) {
  if (!active.ref) return;
  const link = active.ref.current.previous();
  if (link) {
    add({ type: 'url', id: link, referrer: active.ref.current.getReferrer() });
  }
}

export function back({ active, add }) {
  if (!active.ref) return;
  const referrer = active.ref.current.getReferrer();
  if (referrer && referrer.current) {
    add({ type: 'url', id: referrer.current.props.url });
  }
}
