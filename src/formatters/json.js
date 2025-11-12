const formatJson = (diff) => {
  const formatNode = (node) => {
    const formattedNode = {
      key: node.key,
      type: node.type,
    };

    if (node.type === 'added') {
      formattedNode.value = node.value;
    } else if (node.type === 'deleted') {
      formattedNode.value = node.value;
    } else if (node.type === 'unchanged') {
      formattedNode.value = node.value;
    } else if (node.type === 'changed') {
      formattedNode.value1 = node.value1;
      formattedNode.value2 = node.value2;
    } else if (node.type === 'nested') {
      formattedNode.children = node.children.map(formatNode);
    }

    return formattedNode;
  };

  const formattedDiff = diff.map(formatNode);
  return JSON.stringify(formattedDiff, null, 2);
};

export default formatJson;
