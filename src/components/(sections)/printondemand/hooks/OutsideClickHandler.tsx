import { ReactNode, useEffect, useRef } from 'react';

export type OutsideClickHandlerProps = {
  children: ReactNode;
  onOutsideClick: () => void;
};

const OutsideClickHandler = ({ children, onOutsideClick }: OutsideClickHandlerProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Remove event listener on cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onOutsideClick]);

  return <div ref={wrapperRef}>{children}</div>;
};

export default OutsideClickHandler;
