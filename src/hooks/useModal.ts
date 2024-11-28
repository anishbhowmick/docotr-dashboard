import { useState } from 'react';

interface ModalOptions {
  title: string;
  message: string;
  onConfirm: () => void;
}

export function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ModalOptions | null>(null);

  const showModal = (modalOptions: ModalOptions) => {
    setOptions(modalOptions);
    setIsOpen(true);
  };

  const hideModal = () => {
    setIsOpen(false);
    setOptions(null);
  };

  return {
    isOpen,
    options,
    showModal,
    hideModal,
  };
}