import React from 'react';
import { ListItem } from '../ListItem/ListItem';
import clsx from 'clsx';

export interface MenuItemProps {
  className?: string;
  component?: any;
  role?: string;
  selected?: boolean;
  tabIndex?: string | number;
  disabled?: boolean;
  children?: any;
  onClick?: any;
}

const classes = {
  root: 'MenuItem',
};

const MenuItem = React.forwardRef<unknown, MenuItemProps>(function MenuItem(
  props,
  ref
) {
  const {
    className,
    component = 'li',
    role = 'menuitem',
    selected,
    tabIndex: tabIndexProp,
    ...rest
  } = props;

  let tabIndex;
  if (!props.disabled) {
    tabIndex = tabIndexProp !== undefined ? tabIndexProp : -1;
  }
  return (
    <ListItem
      button
      // FIXME: typing
      // @ts-ignore
      role={role}
      tabIndex={tabIndex}
      component={component}
      selected={selected}
      className={clsx(className, classes.root)}
      ref={ref}
      {...rest}
    />
  );
});

export { MenuItem, classes as menuItemClasses };
