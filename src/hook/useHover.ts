import { useEffect, useState } from 'react';

const useHover = (ref: React.RefObject<HTMLDivElement>) => {
  const [value, setValue] = useState<boolean>(false);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(() => {
    const node = ref.current;
    if (node) {
      node.addEventListener('mouseover', handleMouseOver);
      node.addEventListener('mouseout', handleMouseOut);
      return () => {
        node.removeEventListener('mouseover', handleMouseOver);
        node.removeEventListener('mouseout', handleMouseOut);
      };
    }
  }, [ref.current]);
  return value;
};

export default useHover;
