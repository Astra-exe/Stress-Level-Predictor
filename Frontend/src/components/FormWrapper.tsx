import { ReactNode } from "react";

type FormWrapperProps = {
  title: string;
  children: ReactNode;
};

export default function FormWrapper({ title, children }: FormWrapperProps) {
  return (
    <div className="grid">
      <h3 className="font-semibold text-3xl tracking-wide text-center">
        {title}
      </h3>
      <div className="mt-6 grid gap-10">{children}</div>
    </div>
  );
}
