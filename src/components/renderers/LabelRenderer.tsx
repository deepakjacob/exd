import React from 'react';

export interface LabelProps {
  id: string;
  name: string;
}

const LabelRenderer: React.FC<LabelProps> = (props: LabelProps) => <div>A label is rendered</div>;

export default LabelRenderer;
