export const enhanceTree = <T>({
  root,
  getChildren,
  enhance,
}: {
  root: T;
  getChildren: (node: T) => T[];
  enhance: (node: T) => void;
}) => {
  const queue = [root];

  while (queue.length > 0) {
    const node = queue.shift() as T;
    queue.push(...getChildren(node));
    enhance(node);
  }
};
