import _ from 'lodash';

const stringify = (value, depth) => {
  if (value === null) {
    return 'null';
  }
  
  if (typeof value === 'boolean') {
    return value.toString();
  }
  
  if (!_.isPlainObject(value)) {
    return String(value);
  }

  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = Object.entries(value).map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1);
    return `${currentIndent}${key}: ${formattedValue}`;
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

const formatDiff = (diff, depth = 1) => {
  const indentSize = depth * 4;
  const currentIndent = ' '.repeat(indentSize - 2);
  const bracketIndent = ' '.repeat(indentSize - 4);

  const lines = diff.map((node) => {
    const { key, type } = node;

    switch (type) {
    case 'added':
      return `${currentIndent}+ ${key}: ${stringify(node.value, depth + 1)}`;
    case 'deleted':
      return `${currentIndent}- ${key}: ${stringify(node.value, depth + 1)}`;
    case 'unchanged':
      return `${currentIndent}  ${key}: ${stringify(node.value, depth + 1)}`;
    case 'changed':
      return [
        `${currentIndent}- ${key}: ${stringify(node.value1, depth + 1)}`,
        `${currentIndent}+ ${key}: ${stringify(node.value2, depth + 1)}`,
      ].join('\n');
    case 'nested':
      return `${currentIndent}  ${key}: ${formatDiff(node.children, depth + 1)}`;
    default:
      throw new Error(`Unknown node type: ${type}`);
    }
  });

  return ['{', ...lines, `${bracketIndent}}`].join('\n');
};

export default formatDiff;
