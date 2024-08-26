import { zodResolver } from "@hookform/resolvers/zod";
import {
  type Control,
  Controller,
  useForm,
  useFormState,
} from "react-hook-form";
import { userSchema, type User } from "./schema";
import { Input } from "@/components/Input";
import { Label } from "./components/Label";
import { FormMessage } from "./components/FormMessage";
import React from "react";
import { Button } from "./components/Button";

interface FormProps {
  initialData: User;
  onSubmit: (data: User) => void;
  onCancel: () => void;
}

const UserForm = ({ initialData, onSubmit, onCancel }: FormProps) => {
  const form = useForm({
    defaultValues: initialData,
    resolver: zodResolver(userSchema),
  });

  const submitHandler = (data: User) => {
    form.reset(data);
    onSubmit(data);
  };

  return (
    <>
      {/* <p>
        Editing: {initialData.firstName} {initialData.lastName}
      </p> */}
      <form
        className="grid grid-cols-6 p-4 gap-2"
        onSubmit={form.handleSubmit(submitHandler)}
        onReset={() => form.reset()}
      >
        <p className="col-span-full text-lg font-bold">User Edit Form</p>

        <FirstNameField control={form.control} />
        <LastNameField control={form.control} />
        <AgeField control={form.control} />
        <EmailField control={form.control} />
        <Buttons control={form.control} onCancel={onCancel} />
      </form>
    </>
  );
};

export default UserForm;

const FirstNameField = ({ control }: { control: Control<User> }) => {
  const id = React.useId();
  return (
    <Controller
      control={control}
      name="firstName"
      render={({ field, fieldState: { error, invalid } }) => (
        <div className="space-y-2 col-span-3">
          <Label htmlFor={id}>First Name</Label>
          <Input id={id} {...field} />
          {<FormMessage invalid={invalid}>{error?.message}</FormMessage>}
        </div>
      )}
    />
  );
};
const LastNameField = ({ control }: { control: Control<User> }) => {
  const id = React.useId();
  return (
    <Controller
      control={control}
      name="lastName"
      render={({ field, fieldState: { error, invalid } }) => (
        <div className="space-y-2 col-span-3">
          <Label htmlFor={id}>Last Name</Label>
          <Input id={id} {...field} />
          {<FormMessage invalid={invalid}>{error?.message}</FormMessage>}
        </div>
      )}
    />
  );
};

const AgeField = ({ control }: { control: Control<User> }) => {
  const id = React.useId();
  return (
    <Controller
      control={control}
      name="age"
      render={({
        field: { value, onChange, ...field },
        fieldState: { error, invalid },
      }) => (
        <div className="space-y-2 col-span-2">
          <Label htmlFor={id}>Age</Label>
          <Input
            id={id}
            type="number"
            value={value ?? 0}
            onChange={(e) => onChange(e.target.valueAsNumber)}
            {...field}
          />
          {<FormMessage invalid={invalid}>{error?.message}</FormMessage>}
        </div>
      )}
    />
  );
};

const EmailField = ({ control }: { control: Control<User> }) => {
  const id = React.useId();
  return (
    <Controller
      control={control}
      name="email"
      render={({ field, fieldState: { error, invalid } }) => (
        <div className="space-y-2 col-span-4">
          <Label htmlFor={id}>Email</Label>
          <Input id={id} type="email" {...field} />
          {<FormMessage invalid={invalid}>{error?.message}</FormMessage>}
        </div>
      )}
    />
  );
};

interface ButtonsProps {
  control: Control<User>;
  onCancel: () => void;
}

const Buttons = ({ control, onCancel }: ButtonsProps) => {
  const { errors, isDirty } = useFormState({ control });
  const isValid = Object.keys(errors).length === 0 && isDirty;
  return (
    <div className="col-span-full flex gap-2">
      <Button
        size="sm"
        variant="outline"
        onClick={onCancel}
        className="me-auto"
      >
        Cancel
      </Button>
      <Button size="sm" type="reset" disabled={!isDirty}>
        Reset
      </Button>
      <Button size="sm" type="submit" disabled={!isValid}>
        Save
      </Button>
    </div>
  );
};
