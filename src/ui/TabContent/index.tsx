import { Stack } from "@mui/material";
import { FC, ReactNode } from "react";

type Props = {
  active: boolean;
  children: ReactNode;
};

const TabContent: FC<Props> = ({ children, active }) => {
  if (!active) {
    return null;
  }

  if (active) {
    return (
      <Stack
        gap={4}
        borderRadius="0 12px 12px 12px"
        bgcolor={"#540474"}
        maxHeight={600}
        minHeight={600}
        overflow="scroll"
      >
        {children}
      </Stack>
    );
  }
};

export default TabContent;
