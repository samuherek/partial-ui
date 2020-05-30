import clsx from 'clsx';
import React from 'react';
import FormLabel from '../FormLabel';
import { LabelStandard } from './styles';

export interface InputLabelProps extends React.HTMLProps<HTMLLabelElement> {
  className?: string;
  variant?: 'standard';
}

const classes = {
  root: 'InputLabel',
};

const variantComponent = {
  standard: LabelStandard,
};

const InputLabel = React.forwardRef<any, InputLabelProps>(function InputLabel(
  props,
  ref
) {
  const { className, variant = 'standard', ...rest } = props;

  // @ts-ignore
  const LabelComponent = variantComponent[variant];

  return (
    <FormLabel
      className={clsx(className, classes.root)}
      // @ts-ignore
      as={LabelComponent}
      // @ts-ignore
      ref={ref}
      {...rest}
    />
  );
});

export { InputLabel, classes as InputLabelClasses };
