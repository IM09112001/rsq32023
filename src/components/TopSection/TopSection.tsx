import { ReactNode } from "react";

export interface ITopSection {
  children: ReactNode;
}

export const TopSection: React.FC<ITopSection> = ({
  children,
}: ITopSection) => <div className="top_section">{children}</div>;
