import PropTypes from 'prop-types';

const ModalWrapper = ({ children }) => {
  return (
    <div className="h-[100vh] w-full fixed top-0 left-0 z-[51] bg-modalBackground overflow-hidden">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] min-w-[300px] sm:min-w-[500px]">
        <dialog className="block bg-grayV_1 px-6 py-5 w-full rounded-[3px]">
          {children}
        </dialog>
      </div>
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalWrapper;
