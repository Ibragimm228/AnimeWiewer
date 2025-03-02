import { UInputInterface } from "../../../interfaces/uinput.interface";


export const UInput = ({
  placeholder,
  type = 'string',
  value,
  onChange,
}: UInputInterface) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};
