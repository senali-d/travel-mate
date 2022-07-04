import PropTypes from 'prop-types'
import { Form, Input, InputNumber } from 'antd'

const FormInput = ({
  type,
  rules,
  name,
  placeholder,
  disabled,
}) => {
  const getInput = () => {
    switch (type) {
      case "text":
        return (
          <Input
            placeholder={placeholder}
            disabled={disabled}
            className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] hover:border-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        );
      case "number":
        return (
          <InputNumber
            disabled={disabled}
            placeholder={placeholder}
            className="w-full bg-white rounded border border-gray-300 focus:border-[#b1b845] focus:ring-2 focus:ring-[#b1b845] hover:border-[#b1b845] text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        );
      case "textarea":
        return (
          <Input.TextArea
            rows={4}
            disabled={disabled} 
            placeholder={placeholder}
            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-[#b1b845] focus:bg-white focus:ring-2 hover:border-[#b1b845] focus:ring-[#b1b845] h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out mb-2"
          />
        )
      default:
        break;
    }
  };

  return (
    <Form.Item
      name={name}
      rules={rules}
    > 
      {getInput()}
    </Form.Item>
  );
};

FormInput.propTypes = {
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.oneOfType([PropTypes.array]),
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

FormInput.defaultProps = {
  type: "text",
  rules: [],
  placeholder: "",
  disabled: false,
};

export default FormInput;
