import React, { useRef, useState } from 'react';
import * as S from './ScrollingBar.style';
import { Messages } from '../../components/messaging/Messages';
import { MessageProps } from '../../components/messaging/Message';
import { withAutoScroll } from '../../components/hoc/withAutoScroll';

const message = (index: number): MessageProps => {
  return ({ id: `${index}`, body: `hello world ${index}` });
};
const messages: MessageProps[] = [];
for (let i = 1; i <= 100; i++) {
  messages.push(message(i));
}

const AutoScrollWrapper = withAutoScroll(S.ChatWrapper);


const ScrollingBar = () => {
  const chatWrapper = useRef<HTMLDivElement>();
  const [highlightId, setHighlightId] = useState<string>('');
  const [messageScrollTop, setMessageScrollTop] = useState<number | undefined>(undefined);

  const focusMessage = (id: string) => () => {
    setHighlightId(id);
  };

  const clearFocusMessage = () => () => {
    setHighlightId('');
    setMessageScrollTop(undefined);
  }

  const scrollToHighlight = (offsetTop?: number) => {
    if (chatWrapper && offsetTop !== undefined) {
      setMessageScrollTop(offsetTop);
    }
  }

  return (
    <>
      <AutoScrollWrapper scrollTop={messageScrollTop}>
        <Messages messages={messages} highlightId={highlightId} scrollToHighlight={scrollToHighlight} />
      </AutoScrollWrapper>
      <br />
      <S.ButtonGroup>
        <S.Code>{highlightId}</S.Code>
        <S.Button onClick={focusMessage('1')}>GO TO 1</S.Button>
        <S.Button onClick={focusMessage('5')}>GO TO 5</S.Button>
        <S.Button onClick={focusMessage('10')}>GO TO 10</S.Button>
        <S.Button onClick={focusMessage('20')}>GO TO 20</S.Button>
        <S.Button onClick={focusMessage('30')}>GO TO 30</S.Button>
        <S.Button onClick={focusMessage('50')}>GO TO 50</S.Button>
        <S.Button onClick={focusMessage('70')}>GO TO 70</S.Button>
        <S.Button onClick={focusMessage('100')}>GO TO 100</S.Button>
        <S.Button onClick={clearFocusMessage()}>Out Focus</S.Button>
      </S.ButtonGroup>
    </>
  );
}

export default ScrollingBar;
