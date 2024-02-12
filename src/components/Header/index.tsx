"use client";

import { FC } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { useActions } from "@/providers/ActionsProvider";
import { useQueryClient } from "@tanstack/react-query";

const Header: FC = () => {
  const { toggleAction } = useActions();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["fruits"]);

  return (
    <Stack
      gap={4.5}
      paddingBottom={6}
      paddingTop={4.5}
      borderBottom="1px solid #8A06BF"
    >
      <Typography
        variant="h2"
        fontWeight={600}
        fontSize={56}
        color="white"
        fontFamily="inherit"
      >
        Fruit Store
      </Typography>
      <Stack direction="row" gap={2}>
        <Button
          variant="contained"
          //   initially load, after that reload
          onClick={() => toggleAction(data ? "reload" : "load")}
        >
          Load
        </Button>
        <Button variant="contained" onClick={() => toggleAction("add")}>
          Add
        </Button>
        {/* Don't allow deleting if no data loaded */}
        <Button
          variant="contained"
          onClick={() => toggleAction("remove")}
          disabled={!data}
        >
          Delete
        </Button>
      </Stack>
    </Stack>
  );
};

export default Header;
