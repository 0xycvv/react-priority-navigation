import * as React from 'react';
import styled from 'styled-components';

const Root = styled.div`
  background: #fff;
  max-width: 250px;
`;

interface Props {
  children: React.ReactNode;
}

const DropdownList = ({ children }: Props) => (
  <Root>{children}</Root>
);

export default DropdownList;
