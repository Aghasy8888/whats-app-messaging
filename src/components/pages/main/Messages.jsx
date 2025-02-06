import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { selectMessages } from '../../../redux/features/message/messageSlice';

const Messages = () => {
  const scrollRef = useRef(null);
  const messages = useSelector(selectMessages);
  const sortedMessages = [...messages].sort(
    (a, b) => a.timestamp - b.timestamp
  );

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [JSON.stringify(messages)]);

  return (
    <main ref={scrollRef} className="h-screen z-50 overflow-y-scroll">
      <section className="flex flex-col justify-end pb-2 gap-3">
        {sortedMessages.map((message) => (
          <article
            key={message.idMessage}
            className={`flex ${
              message.senderId ? 'justify-start' : 'justify-end'
            } pl-6 pr-5`}
          >
            <div
              className={`min-w-20 max-w-[90%] md:max-w-[50%] ${
                message.senderId ? 'bg-incomingBackground' : 'bg-greenV_4'
              } rounded-lg p-2 pt-[6px] text-grayV_5 text-[14px]`}
            >
              <p className="break-all">{message.textMessage}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Messages;
