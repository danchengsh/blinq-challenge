import './button.styles.css';

const Button = ({ children, fullLength, isLoading, ...otherProps }) => {
    return (
      <button className={`button-styles ${fullLength && 'long-button'} ${isLoading && 'blurred'}`} {...otherProps}>{children}</button>
    );
};

export default Button;
