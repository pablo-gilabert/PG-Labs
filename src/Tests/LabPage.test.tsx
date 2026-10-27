import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LabPage } from '../Pages/LabPage/LabPage';
import { SiteProvider } from '../Contexts/SiteContext';
import { ConfirmModal, OpenModalForm, SuccessModal } from '../Components/SweetAlertForms/SweetAlertForms';

// Only modal presentation is mocked; LabPage state and localStorage remain real.
vi.mock('../Components/SweetAlertForms/SweetAlertForms', () => ({
  OpenModalForm: vi.fn(),
  ConfirmModal: vi.fn(),
  SuccessModal: vi.fn(),
}));

function renderLab() {
  render(<MemoryRouter><SiteProvider><LabPage /></SiteProvider></MemoryRouter>);
}

describe('LabPage — students demo', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.localStorage.clear();
  });

  it('loads the initial student records and supports searching', () => {
    renderLab();
    expect(screen.getByText('Camila Rodríguez')).toBeInTheDocument();
    expect(screen.getByText('Mateo Silva')).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Buscar...'), { target: { value: 'Camila' } });
    expect(screen.getByText('Camila Rodríguez')).toBeInTheDocument();
    expect(screen.queryByText('Mateo Silva')).not.toBeInTheDocument();
  });

  it('adds a student using modal values and persists the result', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ name: 'Lucía Torres', course: 'Color', status: 'enrolled' });
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: /Nuevo alumno/ }));
    expect(await screen.findByText('Lucía Torres')).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-students')).toContain('Lucía Torres'));
    expect(OpenModalForm).toHaveBeenCalledOnce();
  });

  it('does not create a student if the modal is cancelled', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue(null);
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: /Nuevo alumno/ }));
    await waitFor(() => expect(OpenModalForm).toHaveBeenCalledOnce());
    expect(screen.queryByText('Lucía Torres')).not.toBeInTheDocument();
    expect(screen.getByText('Camila Rodríguez')).toBeInTheDocument();
  });

  it('keeps a student if the user cancels the removal confirmation', async () => {
    vi.mocked(ConfirmModal).mockResolvedValue(false);
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Camila Rodríguez' }));
    await waitFor(() => expect(ConfirmModal).toHaveBeenCalledOnce());
    expect(screen.getByText('Camila Rodríguez')).toBeInTheDocument();
  });

  it('deletes only the selected student after confirmation', async () => {
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Camila Rodríguez' }));
    await waitFor(() => expect(screen.queryByText('Camila Rodríguez')).not.toBeInTheDocument());
    expect(screen.getByText('Mateo Silva')).toBeInTheDocument();
  });
});

describe('LabPage — shopping cart demo', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.localStorage.clear();
  });

  it('adds two units of a product through the modal and saves the cart', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ quantity: '2' });
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    fireEvent.click(screen.getAllByRole('button', { name: /Agregar al carrito/ })[0]);
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-cart')).toContain('"p1":2'));
    expect(screen.getByRole('button', { name: /Vaciar carrito/ })).toBeEnabled();
  });

  it('keeps cart contents when clearing is cancelled', async () => {
    window.localStorage.setItem('gs-demo-cart', JSON.stringify({ p1: 2 }));
    vi.mocked(ConfirmModal).mockResolvedValue(false);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: /Vaciar carrito/ }));
    await waitFor(() => expect(ConfirmModal).toHaveBeenCalledOnce());
    expect(screen.getByRole('button', { name: /Vaciar carrito/ })).toBeEnabled();
  });

  it('clears the cart after confirmation without removing previous orders', async () => {
    window.localStorage.setItem('gs-demo-cart', JSON.stringify({ p1: 2, p2: 1 }));
    window.localStorage.setItem('gs-demo-orders', JSON.stringify([{ id: 'PG-001', total: 12500, quantity: 1, time: 'Yesterday' }]));
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: /Vaciar carrito/ }));
    await waitFor(() => expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument());
    expect(screen.getByText('PG-001')).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-cart')).toBe('{}'));
  });

  it('removes only one product type from the cart', async () => {
    window.localStorage.setItem('gs-demo-cart', JSON.stringify({ p1: 2, p2: 1 }));
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    fireEvent.click(screen.getAllByRole('button', { name: /Quitar producto/ })[0]);
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-cart')).toBe('{"p2":1}'));
    expect(screen.getByRole('button', { name: /Vaciar carrito/ })).toBeEnabled();
  });

  it('keeps order registration disabled for an empty cart', () => {
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    expect(screen.getByRole('button', { name: /Registrar pedido de prueba/ })).toBeDisabled();
    expect(SuccessModal).not.toHaveBeenCalled();
  });
});

describe('LabPage — services and editable sections', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    window.localStorage.clear();
  });

  it('creates a new service using validated modal data', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ name: 'Lavado premium', category: 'Peluquería', price: '8000', visible: true });
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Servicios/ }));
    fireEvent.click(screen.getByRole('button', { name: /Nuevo servicio/ }));
    expect(await screen.findByText('Lavado premium')).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-services')).toContain('Lavado premium'));
  });

  it('creates content sections that appear in the list and preview', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ heading: 'Nuestras promociones', body: 'Promociones especiales.' });
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Secciones/ }));
    fireEvent.click(screen.getByRole('button', { name: /Agregar sección/ }));
    await waitFor(() => expect(screen.getAllByText('Nuestras promociones')).toHaveLength(2));
    expect(screen.getAllByText('Promociones especiales.')).toHaveLength(2);
  });

  it('restores all demo data only after reset confirmation', async () => {
    window.localStorage.setItem('gs-demo-students', JSON.stringify([]));
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    expect(screen.queryByText('Camila Rodríguez')).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /Restablecer demo/ }));
    expect(await screen.findByText('Camila Rodríguez')).toBeInTheDocument();
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-students')).toContain('Camila Rodríguez'));
  });

  it('falls back to a safe empty cart when stored quantities are invalid', () => {
    window.localStorage.setItem('gs-demo-cart', JSON.stringify({ p1: -20 }));
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument();
  });
});
