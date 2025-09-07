'use client';
import { FieldValues, useFormContext, UseFormRegisterReturn } from 'react-hook-form';
import { PasswordField, PasswordFieldProps } from './PasswordField';
import { ComponentType } from 'react';

export const PasswordFieldFormContext = ({ ...props, nameField }: { nameField?: string } & PasswordFieldProps) => {
  const { register } = useFormContext();

  return <PasswordField {...props} {...register(nameField)} />;
};

interface DefaultProps {}

type RegisterProps = Partial<UseFormRegisterReturn>;
interface FormInputProps extends RegisterProps {
  name: string;
  label?: string;
  rules?: any;
  disabled?: boolean;
  className?: string;
}

export const WrapperField = <T extends object>(defaultProps: DefaultProps) => {
  const baseProps = {
    ...defaultProps,
  };

  return (WrappedComponent: ComponentType<T & RegisterProps>) => {
    const FormInput: React.FC<FormInputProps & T> = ({ nameField, label, className, disabled, rules, ...props }) => {
      const {
        register,
        formState: { errors },
      } = useFormContext<FieldValues>();

      const registerProps = register(nameField, {
        ...rules,
        ...(props?.onChange && { onChange: (e: any) => props?.onChange?.(e) }),
        ...(props?.onBlur && { onBlur: (e: any) => props?.onBlur?.(e) }),
      });

      return <WrappedComponent {...(props as T)} {...registerProps} />;
    };
    return FormInput;
  };
};
