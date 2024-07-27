import React from 'react';
import {
  fireEvent,
  render,
  screen,
  renderHook,
  act,
} from '@testing-library/react';

import {
  ConfirmationDialogComponent,
  Props,
  LabelProps,
} from './confirmation-dialog.component';

import { useConfirmationDialog } from './confirmation-dialog.hook';
import { createEmptyLookup, Lookup } from 'common/models';

describe('ConfirmationDialogComponent', () => {
  const defaultLabelProps: LabelProps = {
    closeButton: 'Cancelar',
    acceptButton: 'Aceptar',
  };

  const defaultProps: Props = {
    isOpen: true,
    onAccept: jest.fn(),
    onClose: jest.fn(),
    title: 'Eliminar Empleado',
    labels: defaultLabelProps,
    children: <div>¿Seguro que quiere borrar a Daniel Perez?</div>,
  };

  it('should render the confirmation dialog when prop isOpen is true', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('should not render the confirmation dialog when prop isOpen is false', () => {
    const modifiedProps: Props = {
      ...defaultProps,
      isOpen: false,
    };

    render(<ConfirmationDialogComponent {...modifiedProps} />);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('should render the title of the confirmation dialog correctly', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(screen.getByText('Eliminar Empleado')).toBeInTheDocument();
  });

  it('should render the body of the confirmation dialog correctly', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    expect(
      screen.getByText('¿Seguro que quiere borrar a Daniel Perez?')
    ).toBeInTheDocument();
  });

  it('should render the accept button', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const acceptBtn = screen.getByRole('button', { name: /Aceptar/i });

    expect(acceptBtn).toBeInTheDocument();
  });

  it('should render the cancel button', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

    expect(cancelBtn).toBeInTheDocument();
  });

  it('should call onAccept when accept button is clicked', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);
    const acceptBtn = screen.getByRole('button', { name: /Aceptar/i });
    fireEvent.click(acceptBtn);

    expect(defaultProps.onAccept).toHaveBeenCalled();
  });

  it('should call onClose when cancel button is clicked', () => {
    render(<ConfirmationDialogComponent {...defaultProps} />);

    const cancelBtn = screen.getByRole('button', { name: /Cancelar/i });

    fireEvent.click(cancelBtn);
    expect(defaultProps.onClose).toHaveBeenCalled();
  });
});

describe('useConfirmationDialog', () => {
  const exampleItem: Lookup = {
    id: '1',
    name: 'Ben',
  };

  it('should initialize the confirmation dialog correctly', () => {
    const { result } = renderHook(useConfirmationDialog);

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open the confirmation dialog with the item passed when openDialog is called', () => {
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(exampleItem);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(exampleItem);
  });

  it('should close the confirmation dialog when onClose is called', () => {
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(exampleItem);
    });

    act(result.current.onClose);

    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete values when onAccept is called', () => {
    const { result } = renderHook(useConfirmationDialog);

    act(() => {
      result.current.onOpenDialog(exampleItem);
    });

    act(result.current.onAccept);

    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should do nothing if onClose is called when the dialog is closed', () => {
    const { result } = renderHook(useConfirmationDialog);

    act(result.current.onClose);

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should do nothing if onAccept is called when the dialog is closed', () => {
    const { result } = renderHook(useConfirmationDialog);

    act(result.current.onAccept);

    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
