import { getData } from './parsers.js';
import buildDiff from './diffBuilder.js';
import stylish from './formatters/stylish.js';

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);

  switch (format) {
    case 'stylish':
      return stylish(diff);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default genDiff;