import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SiteProvider } from '../Contexts/SiteContext';
import { LabPage } from '../Pages/LabPage/LabPage';
import { ConfirmModal, OpenModalForm, SuccessModal } from '../Components/SweetAlertForms/SweetAlertForms';

// Only the modal interaction is mocked; data mutation and persistence remain real.
vi.mock('../Components/SweetAlertForms/SweetAlertForms', () => ({
  ConfirmModal: vi.fn(),
  OpenModalForm: vi.fn(),
  SuccessModal: vi.fn(),
}));

function renderLab() {
  render(<MemoryRouter><SiteProvider><LabPage /></SiteProvider></MemoryRouter>);
}

// Parse persisted test data as unknown and verify its container type before assertions.
function readStoredRecords(key: string): unknown[] {
  const parsed: unknown = JSON.parse(window.localStorage.getItem(key) ?? '[]');
  if (!Array.isArray(parsed)) throw new Error(`Expected a stored array for ${key}`);
  const records: unknown[] = parsed;
  return records;
}

beforeEach(() => {
  vi.resetAllMocks();
  window.localStorage.clear();
});

describe('Laboratory — additional business workflow regressions', () => {
  it('updates an existing student without duplicating the record', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ name: 'Camila Gómez', course: 'Estilismo', status: 'graduated' });
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: 'Editar: Camila Rodríguez' }));
    expect(await screen.findByText('Camila Gómez')).toBeInTheDocument();
    expect(screen.queryByText('Camila Rodríguez')).not.toBeInTheDocument();
    const stored = readStoredRecords('gs-demo-students');
    expect(stored).toHaveLength(4);
    expect(stored[0]).toMatchObject({ id: '1', name: 'Camila Gómez' });
  });

  it('ignores invalid student modal status values', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ name: 'Test', course: 'Test', status: 'invalid-status' });
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: /Nuevo alumno/ }));
    await waitFor(() => expect(OpenModalForm).toHaveBeenCalledOnce());
    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.getByText('Camila Rodríguez')).toBeInTheDocument();
  });

  it('edits a service price and visibility while retaining the original ID', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ name: 'Corte premium', category: 'Peluquería', price: '25000', visible: false });
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Servicios/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Editar: Corte y styling' }));
    expect(await screen.findByRole('heading', { name: 'Corte premium' })).toBeInTheDocument();
    await waitFor(() => {
      const saved = readStoredRecords('gs-demo-services');
      expect(saved[0]).toMatchObject({ id: '1', price: 25000, visible: false });
    });
  });

  it('toggles a service visibility and removes it only after confirmation', async () => {
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Servicios/ }));
    const article = screen.getByRole('heading', { name: 'Corte y styling' }).closest('article');
    if (!article) throw new Error('Expected service editor card');
    fireEvent.click(within(article).getByRole('button', { name: 'Oculto' }));
    await waitFor(() => {
      const services = readStoredRecords('gs-demo-services');
      expect(services[0]).toMatchObject({ visible: false });
    });
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Corte y styling' }));
    await waitFor(() => expect(screen.queryByRole('heading', { name: 'Corte y styling' })).not.toBeInTheDocument());
  });

  it('reorders sections and updates both editor and preview', async () => {
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Secciones/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Subir: Nuestros servicios' }));
    await waitFor(() => {
      const sections = readStoredRecords('gs-demo-sections');
      expect(sections[0]).toMatchObject({ heading: 'Nuestros servicios' });
    });
    expect(screen.getAllByText('Nuestros servicios')).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Subir: Nuestros servicios' })).toBeDisabled();
  });

  it('edits a section and removes it from the editor and preview', async () => {
    vi.mocked(OpenModalForm).mockResolvedValue({ heading: 'Nueva portada', body: 'Texto actualizado.' });
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Secciones/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Editar: Bienvenidos a nuestro estudio' }));
    await waitFor(() => expect(screen.getAllByText('Nueva portada')).toHaveLength(2));
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar: Nueva portada' }));
    await waitFor(() => expect(screen.queryByText('Nueva portada')).not.toBeInTheDocument());
    expect(screen.getAllByText('Nuestros servicios')).toHaveLength(2);
  });

  it('changes shopping quantities and records the order after confirmation', async () => {
    window.localStorage.setItem('gs-demo-cart', JSON.stringify({ p1: 2 }));
    vi.mocked(ConfirmModal).mockResolvedValue(true);
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Carrito/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Sumar unidad: Studio Notebook' }));
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-cart')).toContain('"p1":3'));
    fireEvent.click(screen.getByRole('button', { name: /Registrar pedido de prueba/ }));
    await waitFor(() => expect(screen.getByText('PG-001')).toBeInTheDocument());
    await waitFor(() => expect(window.localStorage.getItem('gs-demo-cart')).toBe('{}'));
    expect(ConfirmModal).toHaveBeenCalledOnce();
    expect(SuccessModal).toHaveBeenCalledOnce();
  });

  it('preserves modified data when the global reset is cancelled', async () => {
    window.localStorage.setItem('gs-demo-students', JSON.stringify([]));
    vi.mocked(ConfirmModal).mockResolvedValue(false);
    renderLab();
    fireEvent.click(screen.getByRole('button', { name: /Restablecer demo/ }));
    await waitFor(() => expect(ConfirmModal).toHaveBeenCalledOnce());
    expect(screen.queryByText('Camila Rodríguez')).not.toBeInTheDocument();
    expect(window.localStorage.getItem('gs-demo-students')).toBe('[]');
  });

  it('uses safe fallback records when persisted services or sections have invalid types', () => {
    window.localStorage.setItem('gs-demo-services', JSON.stringify([{ id: '1', name: 'Bad', price: 'free', visible: true }]));
    window.localStorage.setItem('gs-demo-sections', JSON.stringify([{ id: '2', heading: null, body: 10 }]));
    renderLab();
    fireEvent.click(screen.getByRole('tab', { name: /Servicios/ }));
    expect(screen.getByRole('heading', { name: 'Corte y styling' })).toBeInTheDocument();
    fireEvent.click(screen.getByRole('tab', { name: /Secciones/ }));
    expect(screen.getAllByText('Nuestros servicios')).toHaveLength(2);
  });
});
