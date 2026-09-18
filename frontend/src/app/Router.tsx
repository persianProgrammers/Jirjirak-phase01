import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Services from '../pages/Services';
import Work from '../pages/Work';
import Contact from '../pages/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'services', element: <Services /> },
      { path: 'work', element: <Work /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
