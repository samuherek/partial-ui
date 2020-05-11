import React from 'react';

export const useEnhancedEffect =
  typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;
