import React, { useRef, useState } from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { MobileMenu } from '../src/components/layout/MobileMenu';
import { StoreProvider } from '../src/features/store/store';

const MenuHarness: React.FC = () => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <StoreProvider>
      <MemoryRouter>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          data-testid="menu-trigger"
        >
          打开菜单
        </button>
        <MobileMenu
          isOpen={open}
          onClose={() => setOpen(false)}
          triggerRef={triggerRef}
        />
      </MemoryRouter>
    </StoreProvider>
  );
};

describe('MobileMenu', () => {
  it('opens drawer and displays navigation links', () => {
    render(<MenuHarness />);

    const trigger = screen.getByTestId('menu-trigger');
    fireEvent.click(trigger);

    const dialog = screen.getByRole('dialog', { name: '导航菜单' });
    expect(dialog).toBeInTheDocument();

    const closeBtn = screen.getByRole('button', { name: '关闭菜单' });
    expect(closeBtn).toBeInTheDocument();
  });

  it('closes on Escape key press and restores focus to trigger', () => {
    render(<MenuHarness />);

    const trigger = screen.getByTestId('menu-trigger');
    fireEvent.click(trigger);

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on close button click and restores focus to trigger', () => {
    render(<MenuHarness />);

    const trigger = screen.getByTestId('menu-trigger');
    fireEvent.click(trigger);

    const closeBtn = screen.getByRole('button', { name: '关闭菜单' });
    fireEvent.click(closeBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });
});
