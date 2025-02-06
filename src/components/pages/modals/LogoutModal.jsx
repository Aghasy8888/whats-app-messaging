import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ModalWrapper } from '.';
import { Button_1 } from '../../../common';
import { logout } from '../../../helpers/auth';
import { setSuccessMessage } from '../../../redux/features/general/generalSlice';

const LogoutModal = ({ setModalIsOpen }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setSuccessMessage('Выход выполнен успешно'));
    logout();
  };

  return (
    <ModalWrapper>
      <h1 className="mb-5 text-start text-whiteV1 text-[1.25rem]">Выйти?</h1>
      <p className="text-whiteV1 text-[1.25rem]">
        Вы действительно хотите выйти?
      </p>
      <div className="flex justify-between gap-4 mt-12 sm:justify-end ">
        <Button_1 setModalIsOpen={() => setModalIsOpen(false)} title="Отмена" />
        <button
          onClick={onLogout}
          className="text-[14px] rounded-3xl font-medium py-2 px-6 text-black_1 bg-green hover:bg-greenV_3"
        >
          Выйти
        </button>
      </div>
    </ModalWrapper>
  );
};

LogoutModal.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
};

export default LogoutModal;
