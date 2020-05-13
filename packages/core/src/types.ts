import { ReactNode, CSSProperties } from 'react';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface UICoreBaseProps extends BaseProps {
  component?: ReactNode;
}

/**
 * All standard components exposed by `material-ui` are `StyledComponents` with
 * certain `classes`, on which one can also set a top-level `className` and inline
 * `style`.
 */
export type StandardProps<C> = {
  className?: string;
  ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>;
  style?: React.CSSProperties;
};
