import { useBlocker, useNavigate } from '@tanstack/react-router';
import React, { FC, ReactNode, RefObject, useCallback } from 'react';
import { useClickAway, useKey, useUpdateEffect } from 'react-use';
interface Props {
  isOpen?: boolean;
  to: string;
  children: ReactNode;
  childRef: RefObject<HTMLDivElement>;
}

const Overlay: FC<Props> = ({ isOpen, to, children, childRef }) => {
  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    navigate({ to });
  }, [navigate, to]);
  useKey('Escape', handleClose);
  useUpdateEffect(() => {
    if (!isOpen) handleClose();
  }, [isOpen]);
  useClickAway(childRef, handleClose);
  useBlocker(() => window.confirm('the changes will be discard are you sure?'), true);
  return (
    <div className="fixed left-0 top-0 z-[99999] flex h-screen w-screen items-center justify-center bg-black bg-opacity-20 backdrop-blur-[.7px]">
      {children}
    </div>
  );
};

export default Overlay;
