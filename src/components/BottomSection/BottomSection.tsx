import { ReactNode } from "react";

export interface IBottomSection {
  children: ReactNode;
}

export const BottomSection: React.FC<IBottomSection> = ({
  children,
}: IBottomSection) => <div className="bottom_section">{children}</div>;
