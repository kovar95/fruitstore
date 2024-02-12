import { FC } from "react";
import { Stack } from "@mui/material";
import Image from "next/image";
import { FruitItem } from "@/types/FruitItem";

type Props = {
  item: FruitItem;
};

const Item: FC<Props> = ({ item: { name, imageUrl, description, price } }) => {
  return (
    <Stack direction="row" gap={3}>
      <Stack>
        <Image
          width={128}
          height={128}
          alt={name}
          unoptimized
          style={{ borderRadius: 8 }}
          src={imageUrl}
        />
      </Stack>
      <Stack paddingY={1} justifyContent="space-between">
        <Stack fontWeight={600}>{name}</Stack>
        <Stack color="lightgray">{description}</Stack>
        <Stack color="green" fontWeight={800}>
          {price} $
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Item;
