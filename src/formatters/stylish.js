import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const stylish = (diff) => {
  const lines = diff.map((node) => {
    switch (node.type) {
      case 'added':
        return `  + ${node.key}: ${formatValue(node.value)}`;
      case 'deleted':
        return `  - ${node.key}: ${formatValue(node.value)}`;
      case 'unchanged':
        return `    ${node.key}: ${formatValue(node.value)}`;
      case 'changed':
        return [
          `  - ${node.key}: ${formatValue(node.value1)}`,
          `  + ${node.key}: ${formatValue(node.value2)}`,
        ].join('\n');
      default:
        throw new Error(`Unknown node type: ${node.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n}`;
};

export default stylish;