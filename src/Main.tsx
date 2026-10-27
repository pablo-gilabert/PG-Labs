import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { SiteProvider } from './Contexts/SiteContext';
import { App } from './App';
// oxlint-disable-next-line import/no-unassigned-import -- Global CSS must be imported for its side effects.
import './Styles/global.css';
// oxlint-disable-next-line import/no-unassigned-import -- SweetAlert2 needs its global base styles.
import 'sweetalert2/dist/sweetalert2.min.css';
createRoot(document.getElementById('root')!).render(<StrictMode>
    <BrowserRouter>
      <SiteProvider><App /></SiteProvider>
    </BrowserRouter>
  </StrictMode>);

