import { Children, cloneElement, isValidElement } from 'react';
import { twMerge } from 'tailwind-merge';

export type AsChildProps<P = unknown> = SlotProps<P> & {
  asChild?: boolean;
};

type AnyProps = Record<string, any>;

function mergeProps(slotProps: AnyProps, childProps: AnyProps) {
  const mergedProps = { ...slotProps, ...childProps };

  for (const propName of Object.keys(slotProps)) {
    if (propName === 'style') {
      if (childProps.style) {
        mergedProps.style = { ...slotProps.style, ...childProps.style };
      }
      continue;
    }

    if (propName === 'className') {
      if (childProps.className) {
        mergedProps.className = twMerge(
          slotProps.className,
          childProps.className,
        );
      }
      continue;
    }

    if (/^on[A-Z]/.test(propName) && childProps[propName]) {
      mergedProps[propName] = (...args: unknown[]) => {
        slotProps[propName](...args);
        childProps[propName](...args);
      };
    }
  }

  return mergedProps;
}

type SlotProps<P = unknown> = {
  children: React.ReactNode;
} & P;

export function Slot<P = unknown>({ children, ...rest }: SlotProps<P>) {
  if (Children.count(children) !== 1) {
    throw new Error('Slot should have only one child');
  }

  if (!isValidElement(children)) {
    throw new Error('Slot child is not a valid element');
  }

  return cloneElement(children, mergeProps(rest, children.props as AnyProps));
}
