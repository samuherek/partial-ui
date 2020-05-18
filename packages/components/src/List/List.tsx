import * as React from 'react';
import clsx from 'clsx';
import styled from 'styled-components';
import { OverrideProps } from '../types';

export interface ListTypeMap<P = {}, D extends React.ElementType = 'ul'> {
  props: P & {};
  defaultComponent: D;
}

export type ListProps<
  D extends React.ElementType = ListTypeMap['defaultComponent'],
  P = {
    component?: any;
  }
> = OverrideProps<ListTypeMap<P, D>, D>;

const classes = {
  root: 'List',
};

const UlStyled = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  position: relative;
`;

const List = React.forwardRef<unknown, ListProps>(function List(props, ref) {
  const {
    children,
    className,
    component: Component = UlStyled,
    ...other
  } = props;

  return (
    <Component className={clsx(className, classes.root)} ref={ref} {...other}>
      {children}
    </Component>
  );
});

export { List, classes as listClasses };
