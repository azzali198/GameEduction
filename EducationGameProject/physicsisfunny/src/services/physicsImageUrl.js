export const physicsImageUrl = (image) => {
  const value = String(image ?? '').trim();
  if (!value) return '';
  if (/^https?:\/\//i.test(value)) return value;

  const filename = /\.[a-z0-9]+$/i.test(value) ? value : `${value}.png`;
  const base = (process.env.PUBLIC_URL || '').replace(/\/$/, '');
  return `${base}/images/${encodeURIComponent(filename)}`;
};
