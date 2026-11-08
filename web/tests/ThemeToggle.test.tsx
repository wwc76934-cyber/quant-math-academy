import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { ThemeToggle } from '../src/components/ui/ThemeToggle';
import { StoreProvider } from '../src/features/store/store';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('toggles theme between light and dark', () => {
    render(
      <StoreProvider>
        <ThemeToggle />
      </StoreProvider>
    );

    const toggleBtn = screen.getByRole('button', { name: /切换到/ });
    expect(toggleBtn).toBeInTheDocument();

    // Initial theme is system (light in test env)
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();

    // Click to switch to dark
    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

    // Click to switch back to light
    fireEvent.click(toggleBtn);
    expect(document.documentElement.getAttribute('data-theme')).toBeNull();
  });
});
