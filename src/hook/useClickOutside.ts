import React, { useEffect } from 'react';
import { includes as _includes } from 'lodash';

const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void
) => {
  useEffect(() => {
    const listener = (evt: Event) => {
      if (
        ref.current.contains(evt.target as HTMLDivElement) ||
        _includes(
          ['year', 'month', 'select', 'select pick'],
          (evt.target as HTMLDivElement).className
        )
      )
        return;
      callback();
    };

    document.addEventListener('click', listener, false);

    return () => {
      document.removeEventListener('click', listener, false);
    };
  }, [ref, callback]);
};

export default useClickOutside;
