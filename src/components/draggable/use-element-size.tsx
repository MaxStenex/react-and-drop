import { ElementSize } from "@/types/common";
import { RefObject, useEffect, useState } from "react";

export const useElementSize = ({
  elementRef,
}: {
  elementRef: RefObject<HTMLLIElement> | null;
}): ElementSize | null => {
  const [elementInitialSize, setElementInitialSize] = useState<ElementSize | null>(null);

  useEffect(() => {
    const element = elementRef?.current;

    if (!element) return;

    setElementInitialSize({
      width: element.clientWidth,
      height: element.clientHeight,
    });
  }, [elementRef]);

  return elementInitialSize;
};
