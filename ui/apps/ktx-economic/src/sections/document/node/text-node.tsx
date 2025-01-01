import type { Node, NodeProps } from '@xyflow/react';

type TextNode = Node<{ text: string }, 'text'>;
 
export default function TextNode({ data }: NodeProps<TextNode>) {
  return <div>A special text: {data.text}</div>;
}
