"use client";

import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

interface FromProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<any>;
  defaultValues?: Record<string, any>;
  resolver?: any;
}

const GlobeForm = ({
  children,
  onSubmit,
  defaultValues,
  resolver
}: FromProps) => {
  const formConfig: any = {};

  if (!!defaultValues) {
    formConfig.defaultValues = defaultValues;
  }

  if (!!resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);

  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default GlobeForm;
