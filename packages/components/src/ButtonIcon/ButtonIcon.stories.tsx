import React from 'react';
import { ButtonIcon } from './ButtonIcon';

export default {
  title: 'Buttons/Button',
  component: ButtonIcon,
};

export const Icon = () => (
  <>
    <div>
      <ButtonIcon color="primary" variant="contained">
        a
      </ButtonIcon>
    </div>
  </>
);
