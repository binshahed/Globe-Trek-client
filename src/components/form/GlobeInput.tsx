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
}

const GlobeInput = ({
  variant = "bordered",
  required = false,
  size = "md",
  type = "string",
  name,
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
      required={required}
      isInvalid={!!errors[name]}
      size={size}
      {...restProps}
    />
  );
};

export default GlobeInput;
