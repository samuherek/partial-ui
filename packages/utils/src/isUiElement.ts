import React from 'react';

export function isUiElement(element: React.ReactNode, uiNames: string[]) {
  // console.log("element", element);
  return (
    // @ts-ignore
    React.isValidElement(element) && uiNames.indexOf(element.type.uiName) !== -1
  );
}
