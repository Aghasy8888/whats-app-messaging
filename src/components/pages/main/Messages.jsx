import { useSelector } from 'react-redux';
import { selectMessages } from '../../../redux/features/message/messageSlice';

const Messages = () => {
  const messages = useSelector(selectMessages);

  return (
    <main className="h-screen z-50  overflow-y-scroll">
      <section className='flex flex-col justify-end pb-2 gap-3'>
        {messages.map((message) => (
          <article
            key={message.idMessage}
            className="flex justify-end pl-6 pr-5"
          >
            <div className="min-w-20 max-w-[90%] md:max-w-[50%] lg:max-w-[30%] bg-greenV_4 rounded-lg p-2 pt-[6px] text-grayV_5 text-[14px]">
              <p className="break-all">{message.textMessage}</p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Messages;
