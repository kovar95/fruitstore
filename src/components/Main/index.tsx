import { FC } from "react";
import { Stack } from "@mui/material";
import Header from "../Header";
import List from "../List";
import AddItem from "../AddItem";
import DeleteModal from "../DeleteModal";

const Main: FC = () => {
  return (
    <Stack paddingX={20} height="100vh" gap={9}>
      <Header />
      <List />
      <AddItem />
      <DeleteModal />
    </Stack>
  );
};

export default Main;
