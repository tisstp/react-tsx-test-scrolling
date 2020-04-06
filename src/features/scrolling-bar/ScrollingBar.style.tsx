import styled from 'styled-components';
import { Button as ButtonUi } from '@material-ui/core';

export const ChatWrapper = styled.div`
  position: relative;
  overflow-y: auto;
  
  width: 800px;
  height: 600px;
  margin: 100px auto 0;
  border: 1px solid #000;
`;

export const ButtonGroup = styled.div`
  text-align: center;
`;

export const Button = styled(ButtonUi)``;

export const Code = styled.div`
  font-size: 20px;
  text-align: center;
`;
