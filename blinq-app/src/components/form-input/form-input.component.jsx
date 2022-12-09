import './form-input.styles.css';

const FormInput = ({ ...otherProps }) => {
    return (
      <input className="input-styles" {...otherProps} />
    );
};

export default FormInput;
