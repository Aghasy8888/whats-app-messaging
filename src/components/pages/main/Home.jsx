import { logoutIcon } from '../../../assets';
import { AddChatModal, LogoutModal } from '../modals';
import useCloseModal from '../../../hooks/useCloseModal';
import { useState } from 'react';
import useSetUserInfo from '../../../hooks/useSetUserInfo';
import { useSelector } from 'react-redux';
import {
  selectChatId,
  selectMessageLoading,
} from '../../../redux/features/message/messageSlice';
import { Spinner } from '../../../common';
import { MessageForm, Messages } from '.';
import { YOUR_MESSAGES_PROTECTED } from '../../../../constants';
import useReceiveNotifications from '../../../hooks/useReceiveNotifications';

const Home = () => {
  const [addChatModalOpen, setAddChatModalOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const loading = useSelector(selectMessageLoading);
  const chatId = useSelector(selectChatId);

  useCloseModal(addChatModalOpen, setAddChatModalOpen, 'dialog', 'button');
  useCloseModal(logoutModalOpen, setLogoutModalOpen, 'dialog', 'button');
  useSetUserInfo();
  useReceiveNotifications();

  return (
    <section className="flex flex-col bg-black_3 h-[100vh] max-w-[1600px] m-auto">
      <header className="flex justify-between px-4 py-3 bg-lighterGray text-base font-normal text-whiteV1">
        <h3 className="font-bold">
          {chatId ? `+${chatId.split('@')[0]}` : ''}
        </h3>
        <div className="flex gap-3">
          <button
            onClick={() => setAddChatModalOpen(true)}
            className="font-bold"
          >
            Новый чат
          </button>
          <button onClick={() => setLogoutModalOpen(true)}>
            <img src={logoutIcon} alt="logoutIcon" className="w-6 h-6" />
          </button>
        </div>
      </header>

      <Messages />

      <footer className="relative z-20 w-full min-h-16 bg-lighterGray">
        <div
          className={`flex ${
            chatId ? 'items-end' : 'items-center justify-center'
          } z-20 relative px-4 pb-[5px] min-h-16`}
        >
          {chatId ? (
            <MessageForm />
          ) : (
            <p className="text-grayV_4 text-[14px]">
              {YOUR_MESSAGES_PROTECTED}
            </p>
          )}
        </div>
      </footer>
      {addChatModalOpen && (
        <AddChatModal setModalIsOpen={setAddChatModalOpen} />
      )}
      {logoutModalOpen && <LogoutModal setModalIsOpen={setLogoutModalOpen} />}
      {loading && <Spinner />}
    </section>
  );
};

export default Home;
