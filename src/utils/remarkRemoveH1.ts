export default function remarkRemoveHeading({ depth = 1 } = {}) {
  return function transformer(tree:any) {
    tree.children = tree.children.filter((node:any) => {
      return !(node.type === 'heading' && node.depth === depth);
    });
  };
}
