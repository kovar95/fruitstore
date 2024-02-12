"use client";

import { FC, SyntheticEvent, useEffect, useState } from "react";
import { Stack, Tab, Tabs, Typography } from "@mui/material";
import Item from "./Item";
import TabContent from "@/ui/TabContent";
import { getCountryAndFlagFromCode, mapItemsByCountry } from "@/utils/parser";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { categories } from "@/constants";
import { FruitItem } from "@/types/FruitItem";
import { useActions } from "@/providers/ActionsProvider";

const List: FC = () => {
  const {
    toggleAction,
    state: { load, reload },
  } = useActions();

  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const currentCategory = categories[value];

  const { data, refetch } = useQuery<FruitItem[]>({
    queryKey: ["fruits"],
    queryFn: async () => {
      const res = await axios.get(process.env.NEXT_PUBLIC_API as string);
      return res.data;
    },
    enabled: load,
  });

  const items =
    currentCategory !== "All"
      ? data?.filter((item) => item.tab === currentCategory)
      : data;
  const mappedItems = mapItemsByCountry(items ?? []);

  useEffect(() => {
    if (reload) {
      setValue(0);
      refetch().then(() => {
        // After refetching, trigger load effect
        toggleAction("load");
      });
      toggleAction("reload");
    }

    if (load) {
      if (!!data?.length && !items?.length) {
        setValue((val) => (val + 1) % categories.length);
      }
      if (!!items?.length) {
        toggleAction("load");
      }
    }
  }, [reload, items?.length, load, data?.length]);

  return (
    <Stack gap={2}>
      <Typography
        variant="h4"
        fontSize={24}
        fontWeight={600}
        fontFamily="inherit"
      >
        Fruit list
      </Typography>
      <Stack>
        <Tabs value={value} onChange={handleChange} textColor="inherit">
          {categories.map((category) => (
            <Tab key={category} label={category} />
          ))}
        </Tabs>
        <TabContent active>
          {Object.keys(mappedItems).map((code) => (
            <Stack key={code} padding="32px 48px" gap={4}>
              <Stack borderBottom="1px solid red" paddingY={1}>
                {getCountryAndFlagFromCode(code)}
              </Stack>
              <Stack gap={3}>
                {mappedItems[code].map((item) => (
                  <Item key={item.id} item={item} />
                ))}
              </Stack>
            </Stack>
          ))}
        </TabContent>
      </Stack>
    </Stack>
  );
};

export default List;
