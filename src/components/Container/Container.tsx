import { ReactNode } from "react";

export interface IContainer {
  children: ReactNode;
}

export const Container: React.FC<IContainer> = ({ children }: IContainer) => (
  <div className="container">{children}</div>
);
