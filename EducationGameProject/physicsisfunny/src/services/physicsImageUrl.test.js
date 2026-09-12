import { physicsImageUrl } from './physicsImageUrl';

const originalPublicUrl = process.env.PUBLIC_URL;

afterEach(() => {
  if (originalPublicUrl === undefined) delete process.env.PUBLIC_URL;
  else process.env.PUBLIC_URL = originalPublicUrl;
});

test('resolves image IDs and filenames to the public images directory', () => {
  process.env.PUBLIC_URL = '';
  expect(physicsImageUrl('175121')).toBe('/images/175121.png');
  expect(physicsImageUrl('175121.png')).toBe('/images/175121.png');
  expect(physicsImageUrl(' force diagram.jpg ')).toBe('/images/force%20diagram.jpg');
  expect(physicsImageUrl(null)).toBe('');
});

test('preserves full image URLs and supports an app deployment subpath', () => {
  process.env.PUBLIC_URL = '/education/';
  expect(physicsImageUrl('175121')).toBe('/education/images/175121.png');
  expect(physicsImageUrl('https://example.com/image.png?v=2')).toBe('https://example.com/image.png?v=2');
});
