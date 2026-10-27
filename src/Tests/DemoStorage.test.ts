import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ReadDemo, WriteDemo, formatMoney } from '../Utils/DemoStorage';

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item: unknown) => typeof item === 'string');
}

describe('DemoStorage — browser persistence', () => {
  beforeEach(() => window.localStorage.clear());

  it('uses fallback data if no entry is saved', () => {
    expect(ReadDemo('students', ['default'], isStringList)).toEqual(['default']);
  });

  it('writes and reads valid data using the expected key', () => {
    WriteDemo('students', ['Camila', 'Mateo']);
    expect(window.localStorage.getItem('gs-demo-students')).toBe('["Camila","Mateo"]');
    expect(ReadDemo('students', [], isStringList)).toEqual(['Camila', 'Mateo']);
  });

  it('returns fallback data if JSON is malformed', () => {
    window.localStorage.setItem('gs-demo-students', '[not json');
    expect(ReadDemo('students', ['fallback'], isStringList)).toEqual(['fallback']);
  });

  it('rejects data that fails the runtime validator', () => {
    window.localStorage.setItem('gs-demo-students', '[10,20]');
    expect(ReadDemo('students', ['safe'], isStringList)).toEqual(['safe']);
  });

  it('uses separate storage keys for each demo', () => {
    WriteDemo('students', ['Camila']);
    WriteDemo('sections', ['About us']);
    expect(ReadDemo('students', [], isStringList)).toEqual(['Camila']);
    expect(ReadDemo('sections', [], isStringList)).toEqual(['About us']);
  });

  it('handles restricted read access without crashing', () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(ReadDemo('students', ['fallback'], isStringList)).toEqual(['fallback']);
  });

  it('handles restricted write access without crashing', () => {
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => { throw new Error('blocked'); });
    expect(() => WriteDemo('students', ['Camila'])).not.toThrow();
  });
});

describe('DemoStorage — currency display', () => {
  it('formats ARS amounts according to the selected language', () => {
    expect(formatMoney(12500, 'es')).toContain('12.500');
    expect(formatMoney(12500, 'en')).toContain('12,500');
    expect(formatMoney(12500, 'pt')).toContain('12.500');
  });

  it('uses Spanish for an unsupported language', () => {
    expect(formatMoney(25000, 'invalid')).toBe(formatMoney(25000, 'es'));
  });
});
