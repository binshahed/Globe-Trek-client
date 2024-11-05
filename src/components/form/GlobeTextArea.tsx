import { Textarea } from "@nextui-org/input";
import { useFormContext } from "react-hook-form";

interface TInputProps {
  variant?: "flat" | "bordered" | "faded" | "underlined";
  required?: boolean;
  size?: "sm" | "md" | "lg";
  type?: string;
  label?: string;
  name: string;
  defaultValue?: string;
  className?: string;
  errorMessage?: string;
  placeholder?: string;
}

const GlobeTextArea = ({
  variant = "bordered",
  required = false,
  defaultValue,
  label,
  name,
  placeholder,
  ...restProps
}: TInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Textarea
      {...register(name)}
      label={label}
      variant={variant}
      defaultValue={defaultValue}
      placeholder={placeholder}
      disableAnimation
      disableAutosize
      required={required}
      isInvalid={!!errors[name]}
      {...restProps}
    />
  );
};

export default GlobeTextArea;
