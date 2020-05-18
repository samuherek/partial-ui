import React from 'react';
import { ButtonAdornment } from './ButtonAdornment';
import { ButtonBase } from '../ButtonBase';

export default {
  title: 'Buttons/Button',
  component: ButtonAdornment,
};

export const Adornment = () => (
  <>
    <ButtonBase
      color="primary"
      variant="contained"
      startAdornment={<ButtonAdornment position="start">a</ButtonAdornment>}
    >
      Start
    </ButtonBase>
  </>
);
