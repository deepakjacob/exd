import React from 'react';

import { CommonControlProps } from '../../types';

export interface LabelProps extends CommonControlProps {
  id: string;
  name: string;
}

const LabelRenderer: React.FC<LabelProps> = (props: LabelProps) => <div>A label is rendered</div>;

export default LabelRenderer;
