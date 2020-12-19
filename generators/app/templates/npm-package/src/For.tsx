import React, { cloneElement, isValidElement } from 'react';
import { warning } from './utils';

export function For<T>({
  collection,
  iterator,
}: {
  collection: T[];
  iterator: (item: T, index?: number) => React.ReactNode;
}) {
  if (!Array.isArray(collection)) {
    warning('In For Component, collection should be an Array.');
    return null;
  }
  return (
    <>
      {collection.map((item, index) => {
        const element = iterator(item, index);
        if (isValidElement(element) && !element.key) {
          return cloneElement(element, { key: index });
        }
        return element;
      })}
    </>
  );
}
