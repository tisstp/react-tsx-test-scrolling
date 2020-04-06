import styled from 'styled-components';
import React, { memo, useEffect, useRef } from 'react';

export interface MessageProps {
  id: string;
  body: string;
  isHighlight?: boolean;
  scrollToHighlight?: (offsetTop?: number) => void;
}

export const Message = styled.div<{ isHighlight?: boolean }>`
  padding: 5px;
  font-size: 14px;
  margin-bottom: 2px;
  background-color: ${({ isHighlight }) => isHighlight ? 'antiquewhite' : 'lightgray'};
`;

export const ChatMessage = memo(({ id, body, isHighlight, scrollToHighlight }: MessageProps) => {
  const chatMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isHighlight && scrollToHighlight) {
      const offsetTop = chatMessageRef?.current?.offsetTop;
      scrollToHighlight(offsetTop);
    }
  }, [isHighlight, scrollToHighlight]);

  return (
    <Message id={id} ref={chatMessageRef} isHighlight={isHighlight}>
      {body}
    </Message>
  );
});

// export const ChatMessage = React.forwardRef<HTMLDivElement, MessageProps>((props, ref) => (
//   <Message ref={ref} {...props}>
//     FancyButton
//   </Message>
// ));

// export class ChatMessage extends Component<MessageProps> {
//   render() {
//     const { id, body } = this.props;
//     return (
//       <Message id={id}>
//         {body}
//       </Message>
//     );
//   }
// }
