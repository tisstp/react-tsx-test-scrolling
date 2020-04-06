import React, { ComponentType, PropsWithChildren, useRef, useLayoutEffect } from 'react';

interface AutoScrollProps {
  scrollTop?: number | undefined;
}

export const withAutoScroll = <ComposedComponentProps extends object>(Component: ComponentType<ComposedComponentProps>) => {
  type WrapperComponentProps = ComposedComponentProps & AutoScrollProps;

  return (props: PropsWithChildren<WrapperComponentProps>) => {
    const componentRef = useRef<HTMLElement>(null);
    const { scrollTop, ...restPropsTmp } = props;

    // now we cast our rest props to proper type
    // 👉 all of this is unfortunately needed because TS issue with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
    const restProps = restPropsTmp as ComposedComponentProps // T is OriginalProps

    useLayoutEffect(() => {
      const isFixedScroll = scrollTop !== undefined && scrollTop >= 0;
      const scrollY = isFixedScroll ? scrollTop : componentRef.current?.scrollHeight;

      if (scrollY !== undefined) {
        componentRef.current?.scrollTo({
          behavior: 'smooth',
          top: scrollY,
        });
      }
    });

    return <Component {...restProps} ref={componentRef} />;
  };
};
