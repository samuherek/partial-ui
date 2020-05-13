import clsx from 'clsx';
import React from 'react';

export interface AvatarProps {
  alt: string;
  children?: any;
  className?: string;
  component?: any;
  imgProps?: object;
  sizes?: string;
  src?: string;
  srcSet?: string;
}

const classes = {
  root: 'Avatar',
  img: 'AvatarImg',
};

const Avatar = React.forwardRef<any, AvatarProps>(function Avatar(props, ref) {
  const {
    alt,
    children,
    className,
    component: Component = 'div',
    imgProps,
    sizes,
    src,
    srcSet,
    ...rest
  } = props;

  return (
    <Component ref={ref} className={clsx(className, classes.root)} {...rest}>
      {src || srcSet ? (
        <img
          alt={alt}
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          className={classes.img}
          {...imgProps}
        />
      ) : (
        children
      )}
    </Component>
  );
});

export { Avatar, classes as avatarClasses };
