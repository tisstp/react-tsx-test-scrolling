import React, { memo, useCallback } from 'react';
import { ChatMessage, MessageProps } from './Message';

export interface MessagesProps {
  messages: MessageProps[];
  highlightId: string;
  scrollToHighlight: (offsetTop?: number) => void;
}

const isHighlightMessage = (messageId: string, highlightId: string) => {
  if (highlightId) {
    return messageId === highlightId;
  }
  return false;
}

export const Messages = memo(({ messages, highlightId, scrollToHighlight }: MessagesProps) => {
  const scrollToHighlightCallback = useCallback((offsetTop?: number) => {
    scrollToHighlight(offsetTop);
  }, [scrollToHighlight]);

  return (
    <>
      {messages.map((message) => {
        return <ChatMessage
          key={message.id}
          id={message.id}
          body={message.body}
          isHighlight={isHighlightMessage(message.id, highlightId)}
          scrollToHighlight={scrollToHighlightCallback}
        />
      })}
    </>
  );
});
