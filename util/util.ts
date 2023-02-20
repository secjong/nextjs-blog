const util = {
  // 빈 Map, 빈 Set, [], {} 도 빈값으로 처리
  isEmpty: (value: any) => {
    // 객체 타입을 비교하는 방법
    // 1. Object.getPrototypeOf(m) === Map.prototype
    // 2. m.constructor === Map.prototype.constructor
    if (
      value === "" ||
      value === null ||
      value === undefined ||
      (Object.getPrototypeOf(value) === Map.prototype && !value.size) || // Map
      (Object.getPrototypeOf(value) === Set.prototype && !value.size) || // Set
      (Object.getPrototypeOf(value) === Array.prototype && !value.length) || // Array
      (Object.getPrototypeOf(value) === Object.prototype &&
        !Object.keys(value).length) // Object
    ) {
      return true;
    } else {
      return false;
    }
  },
  isUrl: (value: string) => {
    const regEx =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    return regEx.test(value);
  },
};

export default util;
