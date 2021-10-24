export const adjustDoubleSlashes = (path) => {
  if (path.length === 1 && path.at(-1) === '/') {
    path = '';
  }

  if (path.at(-1) === '/' && path.at(-2) === '/') {
    path = path.substring(0, path.length - 1);
  }

  return path;
};

const shortMonths = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const formatDate = (dateObject) => {
  return `${dateObject.getDate()} ${
    shortMonths[dateObject.getMonth()]
  } ${dateObject.getFullYear()}`;
};

export const calcuateReadTime = (paraArray) => {
  const textArray = paraArray.map((para) => para.text);
  const wordsCount = textArray.join(' ').split(' ').length;
  return Math.ceil(wordsCount / 100);
};
