import { Input } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface TInputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  required?: boolean;
  size?: "sm" | "md" | "lg";
  type?: string;
  label?: string;
  name: string;
  className?: string;
  errorMessage?: string;
  disable?: boolean;
  defaultValue?: any;
  value?: string;
  onChange?: any;
}

const GlobeInput = ({
  variant = "bordered",
  required = false,
  size = "md",
  type = "string",
  name,
  disable,
  defaultValue,
  value,
  onChange,
  ...restProps
}: TInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Input
      {...register(name)}
      type={type}
      variant={variant}
      name={name}
      required={required}
      isInvalid={!!errors[name]}
      size={size}
      disabled={disable}
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
      {...restProps}
    />
  );
};

export default GlobeInput;
