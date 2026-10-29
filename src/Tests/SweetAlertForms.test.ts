import { beforeEach, describe, expect, it, vi } from 'vitest';
import Swal, { type SweetAlertOptions } from 'sweetalert2';
import {
  OpenModalForm,
  ConfirmModal,
  SuccessModal,
  type ModalLabels,
  type ModalField,
} from '../Components/SweetAlertForms/SweetAlertForms';

type TestModalResult = {
  isConfirmed: boolean;
  value?: Record<string, string | boolean>;
};

// Keep the mock's return state separate from SweetAlert2's overloaded, generic fire signature.
const ModalState = vi.hoisted((): { result: TestModalResult } => ({ result: { isConfirmed: false } }));

vi.mock('sweetalert2', () => ({
  default: {
    fire: vi.fn(async () => ModalState.result),
    showValidationMessage: vi.fn(),
  },
}));

const labels: ModalLabels = {
  save: 'Guardar',
  cancel: 'Cancelar',
  validation: 'Revisá los datos',
  confirm: 'Confirmar',
};

function setModalResult(isConfirmed: boolean, value?: Record<string, string | boolean>) {
  ModalState.result = value === undefined ? { isConfirmed } : { isConfirmed, value };
}

function isModalOptions(value: unknown): value is SweetAlertOptions {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
    && 'title' in value && 'customClass' in value;
}

function getOptions(): SweetAlertOptions {
  const call = vi.mocked(Swal.fire).mock.calls.at(-1);
  if (!call || !isModalOptions(call[0])) throw new Error('Expected SweetAlert2 options');
  return call[0];
}

function getFormElement(): HTMLElement {
  const html = getOptions().html;
  if (!(html instanceof HTMLElement)) throw new Error('Expected a DOM-based SweetAlert2 form');
  return html;
}

function field(container: HTMLElement, key: string): HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement {
  const element = container.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[data-modal-field="${key}"]`);
  if (!element) throw new Error(`Missing modal field: ${key}`);
  return element;
}

function inputField(container: HTMLElement, key: string): HTMLInputElement {
  const element = field(container, key);
  if (!(element instanceof HTMLInputElement)) throw new Error(`Expected an input field: ${key}`);
  return element;
}

beforeEach(() => {
  vi.clearAllMocks();
  setModalResult(false);
});

describe('OpenModalForm — safe DOM construction and validation', () => {
  it('constructs labeled text, textarea, select, checkbox and number controls', async () => {
    const fields: ModalField[] = [
      { key: 'name', label: 'Name', type: 'text', required: true, maxLength: 60, value: 'Camila' },
      { key: 'notes', label: 'Notes', type: 'textarea', maxLength: 200, value: 'Initial note' },
      { key: 'status', label: 'Status', type: 'select', value: 'active', options: [{ value: 'active', label: 'Active' }, { value: 'paused', label: 'Paused' }] },
      { key: 'visible', label: 'Visible', type: 'checkbox', value: true },
      { key: 'quantity', label: 'Quantity', type: 'number', required: true, value: '3', min: 1, max: 20 },
    ];
    await OpenModalForm('Edit demo', fields, labels);
    const content = getFormElement();
    expect(content.querySelector('label[for="modal-name"]')).toHaveTextContent('Name');
    expect(field(content, 'name')).toHaveAttribute('maxlength', '60');
    expect(field(content, 'name')).toHaveValue('Camila');
    expect(field(content, 'notes').tagName).toBe('TEXTAREA');
    expect(field(content, 'notes')).toHaveValue('Initial note');
    expect(field(content, 'status').tagName).toBe('SELECT');
    expect(field(content, 'status')).toHaveValue('active');
    expect(inputField(content, 'visible').checked).toBe(true);
    expect(field(content, 'quantity')).toHaveAttribute('min', '1');
    expect(field(content, 'quantity')).toHaveAttribute('max', '20');
    expect(field(content, 'quantity')).toHaveAttribute('step', '1');
    expect(getOptions()).toMatchObject({ showCancelButton: true, confirmButtonText: labels.save, cancelButtonText: labels.cancel });
  });

  it('inserts untrusted labels as text rather than markup', async () => {
    await OpenModalForm('Safe form', [{ key: 'safe', label: '<img src=x onerror=alert(1)>', type: 'text' }], labels);
    const content = getFormElement();
    expect(content.querySelector('label')).toHaveTextContent('<img src=x onerror=alert(1)>');
    expect(content.querySelector('img')).toBeNull();
  });

  it('returns submitted values only after a confirmed modal', async () => {
    const submitted = { name: 'New record', enabled: true };
    setModalResult(true, submitted);
    expect(await OpenModalForm('Create', [{ key: 'name', label: 'Name', type: 'text' }], labels)).toEqual(submitted);
    setModalResult(false);
    expect(await OpenModalForm('Create', [], labels)).toBeNull();
  });

  it('rejects missing required text and selects the invalid field', async () => {
    await OpenModalForm('Create', [{ key: 'name', label: 'Name', type: 'text', required: true }], labels);
    const content = getFormElement();
    field(content, 'name').value = '   ';
    expect(getOptions().preConfirm?.(undefined)).toBe(false);
    expect(Swal.showValidationMessage).toHaveBeenCalledWith(labels.validation);
  });

  it('rejects text that exceeds its configured maximum length', async () => {
    await OpenModalForm('Create', [{ key: 'notes', label: 'Notes', type: 'textarea', maxLength: 4 }], labels);
    field(getFormElement(), 'notes').value = 'too long';
    expect(getOptions().preConfirm?.(undefined)).toBe(false);
    expect(Swal.showValidationMessage).toHaveBeenCalled();
  });

  it.each(['0', '-1', '1.5', '21', 'Infinity', 'abc', ''])('rejects an invalid numeric quantity %s', async (quantity) => {
    await OpenModalForm('Quantity', [{ key: 'quantity', label: 'Quantity', type: 'number', min: 1, max: 20, required: true }], labels);
    field(getFormElement(), 'quantity').value = quantity;
    expect(getOptions().preConfirm?.(undefined)).toBe(false);
    expect(Swal.showValidationMessage).toHaveBeenCalledWith(labels.validation);
  });

  it('trims string values, reads checkbox state and accepts valid integers', async () => {
    await OpenModalForm('Create', [
      { key: 'name', label: 'Name', type: 'text', required: true },
      { key: 'quantity', label: 'Quantity', type: 'number', min: 1, max: 20 },
      { key: 'visible', label: 'Visible', type: 'checkbox' },
    ], labels);
    const content = getFormElement();
    field(content, 'name').value = '   Notebook   ';
    field(content, 'quantity').value = '2';
    inputField(content, 'visible').checked = true;
    expect(getOptions().preConfirm?.(undefined)).toEqual({ name: 'Notebook', quantity: '2', visible: true });
    expect(Swal.showValidationMessage).not.toHaveBeenCalled();
  });

  it('rejects a missing field rather than returning incomplete data', async () => {
    await OpenModalForm('Create', [{ key: 'course', label: 'Course', type: 'text' }], labels);
    const content = getFormElement();
    field(content, 'course').remove();
    expect(getOptions().preConfirm?.(undefined)).toBe(false);
    expect(Swal.showValidationMessage).toHaveBeenCalledWith(labels.validation);
  });

  it('focuses the first editable control when the modal opens', async () => {
    await OpenModalForm('Create', [
      { key: 'visible', label: 'Visible', type: 'checkbox' },
      { key: 'name', label: 'Name', type: 'text' },
    ], labels);
    const content = getFormElement();
    document.body.append(content);
    try {
      getOptions().didOpen?.(content);
      expect(field(content, 'name')).toHaveFocus();
    } finally {
      content.remove();
    }
  });
});

describe('Confirmation and success modals', () => {
  it('returns false when a destructive action is cancelled', async () => {
    setModalResult(false);
    expect(await ConfirmModal('Delete?', 'This cannot be undone', labels, true)).toBe(false);
    expect(getOptions()).toMatchObject({ icon: 'warning', title: 'Delete?', showCancelButton: true, focusCancel: true });
  });

  it('returns true when the user confirms a destructive action', async () => {
    setModalResult(true);
    expect(await ConfirmModal('Delete?', 'Confirm deletion', labels, true)).toBe(true);
    expect(getOptions().customClass?.confirmButton).toContain('dangerButton');
  });

  it('can confirm a non-destructive action without danger styling', async () => {
    setModalResult(true);
    expect(await ConfirmModal('Continue?', 'Proceed', labels)).toBe(true);
    expect(getOptions().customClass?.confirmButton).not.toContain('dangerButton');
  });

  it('displays success feedback with the provided close label', async () => {
    await SuccessModal('Created', 'Your order is simulated', 'Close');
    expect(getOptions()).toMatchObject({ icon: 'success', title: 'Created', text: 'Your order is simulated', confirmButtonText: 'Close' });
  });
});
