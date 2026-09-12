import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import Swal from 'sweetalert2';

jest.mock('react-router-dom', () => {
  global.TextEncoder = require('util').TextEncoder;
  // CRA's Jest resolver cannot resolve React Router DOM 7's package exports.
  return jest.requireActual('react-router');
}, { virtual: true });
jest.mock('./Components/Home/Home', () => () => <div>Home page</div>);
jest.mock('./Components/Physics/PhysicsGame', () => () => <div>Physics page</div>);
jest.mock('./Components/Chemistry/ChemistryGame', () => () => <div>Chemistry page</div>);
jest.mock('./Components/Forum/Forum', () => () => <div>Forum page</div>);
jest.mock('./Components/Subscription/SubscriptionPage', () => () => <div>Subscription page</div>);
jest.mock('./Components/Profile/Profile', () => () => <div>Profile page</div>);
jest.mock('./Components/Contact/Contact', () => () => <div>Contact page</div>);
jest.mock('./Components/Admin/Admin', () => () => <div>Admin page</div>);
jest.mock('./Components/Login/LoginModal', () => () => <div>Login dialog</div>);
jest.mock('./context/UserContext', () => ({ useUser: () => ({ userName: 'Test' }) }));
jest.mock('sweetalert2', () => ({ fire: jest.fn() }));

beforeEach(() => {
  sessionStorage.clear();
  window.history.replaceState({}, '', '/');
  jest.clearAllMocks();
});

test('navbar links have real destinations and navigate without reloading', () => {
  sessionStorage.setItem('isAuthenticated', 'true');
  sessionStorage.setItem('isAdmin', 'true');
  render(<App />);
  for (const [name, path] of Object.entries({ Home: '/', Physics: '/physics', Chemistry: '/chemistry', Forum: '/forum', Contact: '/contact', Admin: '/admin' })) {
    expect(screen.getByRole('link', { name }).getAttribute('href')).toBe(path);
  }
  fireEvent.click(screen.getByRole('link', { name: 'Contact' }));
  expect(window.location.pathname).toBe('/contact');
  expect(screen.getByText('Contact page')).toBeTruthy();
});

test('opens a game directly and preserves cancel/confirm when leaving', async () => {
  sessionStorage.setItem('isAuthenticated', 'true');
  window.history.replaceState({}, '', '/chemistry');
  render(<App />);
  expect(screen.getByText('Chemistry page')).toBeTruthy();
  Swal.fire.mockResolvedValueOnce({ isConfirmed: false });
  fireEvent.click(screen.getByRole('link', { name: 'Home' }));
  await waitFor(() => expect(Swal.fire).toHaveBeenCalledTimes(1));
  expect(window.location.pathname).toBe('/chemistry');
  Swal.fire.mockResolvedValueOnce({ isConfirmed: true });
  fireEvent.click(screen.getByRole('link', { name: 'Home' }));
  await screen.findByText('Home page');
  expect(window.location.pathname).toBe('/');
});

test('guests are prompted to log in when clicking a game', () => {
  render(<App />);
  fireEvent.click(screen.getByRole('link', { name: /Chemistry/ }));
  expect(screen.getByText('Login dialog')).toBeTruthy();
  expect(window.location.pathname).toBe('/');
});

test('a direct admin URL does not bypass the admin check', () => {
  sessionStorage.setItem('isAuthenticated', 'true');
  window.history.replaceState({}, '', '/admin');
  render(<App />);
  expect(screen.getByText('Home page')).toBeTruthy();
  expect(window.location.pathname).toBe('/');
});
