import Swal from 'sweetalert2';
import styles from './sweetAlertForms.module.css';

export type ModalField = {
  key: string;
  label: string;
  type: 'text' | 'number' | 'textarea' | 'select' | 'checkbox';
  value?: string | boolean;
  maxLength?: number;
  min?: number;
  max?: number;
  options?: { value: string; label: string }[];
  required?: boolean;
};

export type ModalLabels = {
  save: string;
  cancel: string;
  validation: string;
  confirm: string;
};

function createFormField(field: ModalField): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.className = field.type === 'checkbox' ? styles.checkboxField : styles.field;
  const label = document.createElement('label');
  const id = `modal-${field.key}`;
  label.htmlFor = id;
  label.textContent = field.label;

  let element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
  if (field.type === 'textarea') {
    const textarea = document.createElement('textarea');
    textarea.rows = 4;
    element = textarea;
  } else if (field.type === 'select') {
    const select = document.createElement('select');
    for (const option of field.options ?? []) {
      const item = document.createElement('option');
      item.value = option.value;
      item.textContent = option.label;
      select.append(item);
    }
    element = select;
  } else {
    const input = document.createElement('input');
    input.type = field.type;
    if (field.type === 'number') {
      input.step = '1';
      if (field.min !== undefined) input.min = String(field.min);
      if (field.max !== undefined) input.max = String(field.max);
    }
    element = input;
  }

  element.id = id;
  element.dataset.modalField = field.key;
  element.className = styles.input;
  if (field.maxLength !== undefined && element instanceof HTMLInputElement && field.type !== 'number') {
    element.maxLength = field.maxLength;
  }
  if (field.maxLength !== undefined && element instanceof HTMLTextAreaElement) {
    element.maxLength = field.maxLength;
  }
  if (field.required && field.type !== 'checkbox') element.required = true;
  if (field.type === 'checkbox' && element instanceof HTMLInputElement) {
    element.checked = field.value === true;
  } else {
    element.value = typeof field.value === 'string' ? field.value : '';
  }
  // Build fields using DOM APIs so saved user content is never interpolated into HTML.
  if (field.type === 'checkbox') wrapper.append(element, label);
  else wrapper.append(label, element);
  return wrapper;
}

const ModalClasses = {
  popup: styles.popup,
  title: styles.title,
  htmlContainer: styles.htmlContainer,
  confirmButton: styles.confirmButton,
  cancelButton: styles.cancelButton,
  actions: styles.actions,
  validationMessage: styles.validationMessage,
};

export async function OpenModalForm(
  title: string,
  fields: ModalField[],
  labels: ModalLabels,
): Promise<Record<string, string | boolean> | null> {
  const content = document.createElement('div');
  content.className = styles.form;
  for (const field of fields) content.append(createFormField(field));

  const result = await Swal.fire<Record<string, string | boolean>>({
    title,
    html: content,
    showCancelButton: true,
    confirmButtonText: labels.save,
    cancelButtonText: labels.cancel,
    buttonsStyling: false,
    customClass: ModalClasses,
    width: 520,
    focusConfirm: false,
    didOpen: () => {
      const firstInput = content.querySelector<HTMLInputElement>('input:not([type="checkbox"]), textarea, select');
      firstInput?.focus();
    },
    preConfirm: () => {
      const values: Record<string, string | boolean> = {};
      for (const field of fields) {
        const control = content.querySelector<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(`[data-modal-field="${field.key}"]`);
        if (!control) {
          Swal.showValidationMessage(labels.validation);
          return false;
        }
        if (field.type === 'checkbox' && control instanceof HTMLInputElement) {
          values[field.key] = control.checked;
          continue;
        }
        const value = control.value.trim();
        if (field.required && !value) {
          Swal.showValidationMessage(labels.validation);
          control.focus();
          return false;
        }
        if (field.maxLength !== undefined && value.length > field.maxLength) {
          Swal.showValidationMessage(labels.validation);
          control.focus();
          return false;
        }
        if (field.type === 'number') {
          const parsed = Number(value);
          if (!value || !Number.isInteger(parsed) || !Number.isSafeInteger(parsed)
            || (field.min !== undefined && parsed < field.min)
            || (field.max !== undefined && parsed > field.max)) {
            Swal.showValidationMessage(labels.validation);
            control.focus();
            return false;
          }
        }
        values[field.key] = value;
      }
      return values;
    },
  });
  return result.isConfirmed && result.value ? result.value : null;
}

export async function ConfirmModal(
  title: string,
  description: string,
  labels: ModalLabels,
  danger = false,
): Promise<boolean> {
  const result = await Swal.fire({
    icon: 'warning',
    title,
    text: description,
    showCancelButton: true,
    confirmButtonText: labels.confirm,
    cancelButtonText: labels.cancel,
    reverseButtons: true,
    focusCancel: true,
    buttonsStyling: false,
    customClass: {
      ...ModalClasses,
      confirmButton: danger ? `${styles.confirmButton} ${styles.dangerButton}` : styles.confirmButton,
    },
  });
  return result.isConfirmed;
}

export async function SuccessModal(title: string, description: string, close: string): Promise<void> {
  await Swal.fire({
    icon: 'success',
    title,
    text: description,
    confirmButtonText: close,
    buttonsStyling: false,
    customClass: ModalClasses,
  });
}
