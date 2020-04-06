import React, {
  Component,
  ComponentClass,
  ComponentType, forwardRef,
  PropsWithChildren, Ref,
  RefObject,
  useLayoutEffect,
  useRef
} from 'react';


// function hoc<T extends React.ComponentClass<any>>(
//   Component: T,
// ): React.ForwardRefExoticComponent<React.ComponentPropsWithoutRef<T> & { ref?: React.Ref<InstanceType<T>> }>;
//
// function hoc<P extends { ref?: React.Ref<any> }>(
//   Component: React.ForwardRefExoticComponent<P>,
// ): React.ForwardRefExoticComponent<P>;
//
// function hoc<P>(
//   Component: React.FunctionComponent<P>,
// ): React.ForwardRefExoticComponent<P>;
//
// function hoc<P>(Component: React.ComponentType<P>) {
//   // I don't know how to implement this without breaking out of the types.
//   // The overloads are ensuring correct usage, so we should be good?
//   // @ts-ignore
//   return React.forwardRef((props, ref) => <Component ref={ref} {...props} />);
// }
//
// export default hoc;

/*interface WithRefProps extends Object {
  forwardedRef: any;
  ref: any;
}*/

export const withRef = <T extends object>(Component: ComponentType<T>) => {
  // We create PrivateProps type
  type PrivateProps = { forwardedRef: RefObject<unknown> }
  // Now our HoC component props will consist of both Original and Private
  type Props = T & PrivateProps // T is OriginalProps

  const WithRef = (props: PropsWithChildren<Props>) => {
    const {
      forwardedRef,
      // we create temp variable to store runtime ...rest values from this.props
      ...restPropsTmp
    } = props;

    // now we cast our rest props to proper type
    // 👉 all of this is unfortunately needed because TS issue with spreading Generics https://github.com/Microsoft/TypeScript/issues/15792
    const rest = restPropsTmp as T // T is OriginalProps

    return(<Component ref={forwardedRef}{...rest} />);
  }

  return React.forwardRef<Props, any>((props, ref) => {
    return <WithRef {...props} forwardedRef={ref} />;
  });
}
// https://github.com/Hotell/blogposts/blob/master/2018-08/react-ts-refs/src/app/06-forwarding-refs-in-hoc.tsx
export default withRef;

/*export const withAutoScroll = <T extends object>(Component: ComponentType<T>) => (props: PropsWithChildren<T>) => {
  const componentRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    console.log('AutoScrollWrapper:', componentRef?.current?.scrollHeight);
    // componentRef.current?.scrollTo(0, componentRef.current.scrollHeight);
  });

  return <Component {...props} ref={componentRef} />;
};*/

/*export const myHoc = <ComposedComponentProps extends {}>(
  ComposedComponent: ComponentClass<ComposedComponentProps>,
) => {
  type ComposedComponentInstance = InstanceType<typeof ComposedComponent>;

  type WrapperComponentProps = ComposedComponentProps & {
    wrapperComponentProp: number;
  };
  type WrapperComponentPropsWithForwardedRef = WrapperComponentProps & {
    forwardedRef: Ref<ComposedComponentInstance>;
  };

  class WrapperComponent extends Component<
    WrapperComponentPropsWithForwardedRef,
    {}
    > {
    render() {
      const {
        forwardedRef,
        wrapperComponentProp,
        ...composedComponentProps
      } = this.props;

      return (
        <ComposedComponent
          ref={forwardedRef}
          // We need a cast because:
          // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/32355
          // https://github.com/Microsoft/TypeScript/issues/28938#issuecomment-450636046
          {...composedComponentProps as ComposedComponentProps}
        />
      );
    }
  }

  return forwardRef<ComposedComponentInstance, WrapperComponentProps>(
    (props, ref) => <WrapperComponent forwardedRef={ref} {...props} />,
  );
};*/

// follow -> https://gist.github.com/OliverJAsh/d2f462b03b3e6c24f5588ca7915d010e
