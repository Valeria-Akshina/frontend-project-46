import { getData } from './parsers.js';
import buildDiff from './diffBuilder.js';
import getFormatter from './formatters/index.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);
  const formatter = getFormatter(format);
  
  return formatter(diff);
};

export default genDiff;