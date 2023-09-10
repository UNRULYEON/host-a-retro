const getRandomItemFromArray = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default getRandomItemFromArray;
