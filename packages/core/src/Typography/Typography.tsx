import clsx from 'clsx';
import React from 'react';

type HTMLTypes = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';

export type TypographyProps = {
  children?: any;
  component?: HTMLTypes;
  className?: string;
  title?: string;
  id?: string; // Comment: this is for accessibility reasosn
};

export const classes = {
  root: 'Typography',
};

const Typography = React.forwardRef<any, TypographyProps>(function Typography(
  props,
  ref
) {
  const { className, component: Component = 'p', ...rest } = props;

  return (
    <Component className={clsx(className, classes.root)} ref={ref} {...rest} />
  );
});

export { Typography, classes as TypographyClasses };
