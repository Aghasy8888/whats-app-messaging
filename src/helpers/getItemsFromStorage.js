 const getItemFromStorage = (
    item,
  ) => {
    if (
      typeof window.localStorage.getItem(item) === 'string'
    ) {
      return JSON.parse(window.localStorage.getItem(item));
    }
  };

  export default getItemFromStorage;