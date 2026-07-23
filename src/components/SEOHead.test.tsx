import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import SEOHead from './SEOHead';
import '../i18n';

describe('SEOHead', () => {
  it('sets document.title from the title prop', () => {
    render(<SEOHead path="/test" title="Custom Title" description="Custom description" />);
    expect(document.title).toBe('Custom Title');
  });
});
