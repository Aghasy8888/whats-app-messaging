import PropTypes from 'prop-types';

const Button_1 = ({ setModalIsOpen, title }) => {
  return (
    <button
      type="button"
      onClick={setModalIsOpen}
      className="text-[14px] rounded-3xl font-medium py-2 px-6 border border-solid border-grayV_2 text-green hover:text-greenV_2"
    >
      {title}
    </button>
  );
};

Button_1.propTypes = {
  setModalIsOpen: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default Button_1;
