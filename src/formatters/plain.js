import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  
  return String(value);
};

const buildPath = (currentPath, key) => (currentPath ? `${currentPath}.${key}` : key);

const formatDiff = (diff, path = '') => {
  const lines = diff.flatMap((node) => {
    const { key, type } = node;
    const currentPath = buildPath(path, key);

    switch (type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${stringify(node.value)}`;
    case 'deleted':
      return `Property '${currentPath}' was removed`;
    case 'changed':
      return `Property '${currentPath}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
    case 'nested':
      return formatDiff(node.children, currentPath);
    case 'unchanged':
      return [];
    default:
      throw new Error(`Unknown node type: ${type}`);
    }
  });

  return lines.filter((line) => line !== '').join('\n');
};

export default formatDiff;