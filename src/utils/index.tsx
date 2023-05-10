export const isEmpty = (item: any): boolean => {
    if (typeof item === 'undefined') {
      return true;
    }
    if (typeof item === 'string' || Array.isArray(item)) {
      // if the item is a string or array
      return item.length === 0; // returns true if the string length is 0 or array is empty
    }
    if (item === null) {
      return true;
    }
    if (typeof item === 'object') {
      return Object.keys(item).length === 0;
    }
  
    return false;
  };