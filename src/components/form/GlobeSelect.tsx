import { Select, SelectItem } from "@nextui-org/select";
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
  options: TData[];
  placeholder?: string;
  loading?: boolean;
}

interface TData {
  value: string;
  label: string;
}

const GlobeSelect = ({
  variant = "bordered",
  required = false,
  size = "md",
  type = "string",
  name,
  options,
  label,
  placeholder = "Select an option",
  loading,
  ...restProps
}: TInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <Select
      isLoading={loading}
      label={label}
      placeholder={placeholder}
      {...register(name)}
      variant={variant}
      required={required}
      isInvalid={!!errors[name]}
      size={size}
      {...restProps}
    >
      {options.map((data: TData) => (
        <SelectItem key={data?.value}>{data.label}</SelectItem>
      ))}
    </Select>
  );
};

export default GlobeSelect;
