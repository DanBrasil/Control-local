import type { PropsWithChildren } from "react";
import { CardContainer } from "./Card.styles";

export const Card = ({ children }: PropsWithChildren) => {
  return <CardContainer>{children}</CardContainer>;
};
