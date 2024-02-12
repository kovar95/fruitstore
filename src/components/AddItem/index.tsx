"use client";

import { FC, useState } from "react";
import { useFormik } from "formik";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import { categories, countryCodes } from "@/constants";
import { useActions } from "@/providers/ActionsProvider";
import { getCountryFromCode } from "@/utils/parser";
import axios, { AxiosError } from "axios";
import ModalContent from "@/ui/ModalContent";
import HelperText from "@/ui/HelperText";

type FormikValues = {
  countryCode: string;
  tab: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
};

const Schema = Yup.object().shape({
  countryCode: Yup.string().required("This field must be filled!"),
  tab: Yup.string().required("This field must be filled!"),
  name: Yup.string().required("This field must be filled!"),
  imageUrl: Yup.string(),
  description: Yup.string().required("This field must be filled!"),
  price: Yup.number().required("This field must be filled!"),
});

const AddItem: FC = () => {
  const {
    toggleAction,
    state: { add },
  } = useActions();

  const [error, setError] = useState<string | null>(null);

  const { values, handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik<FormikValues>({
      initialValues: {
        tab: "",
        price: 0,
        name: "",
        imageUrl: "",
        description: "",
        countryCode: "",
      },
      validationSchema: Schema,
      onSubmit: async (val, helpers) => {
        const newFruit = { ...val, id: uuidv4() };

        try {
          await axios.post(process.env.NEXT_PUBLIC_API as string, newFruit);
          helpers.resetForm();
        } catch (err) {
          setError((err as AxiosError).message);
        }
      },
    });

  const { tab, imageUrl, countryCode, price, description, name } = values;

  return (
    <Modal open={add} onClose={() => toggleAction("add")}>
      <ModalContent sx={{ width: 568 }}>
        <Typography variant="h2" fontSize={24}>
          Add Fruit
        </Typography>
        <Stack gap={3}>
          <Stack position="relative">
            <FormControl fullWidth focused={false}>
              <FormLabel>Tab:</FormLabel>
              <Select
                IconComponent={KeyboardArrowDownOutlinedIcon}
                id="tab"
                onChange={handleChange}
                value={tab}
                name="tab"
                onBlur={handleBlur}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <HelperText error>{!!touched?.tab ? errors.tab : ""}</HelperText>
          </Stack>

          <Stack position="relative">
            <FormControl fullWidth focused={false}>
              <FormLabel>Country:</FormLabel>
              <Select
                IconComponent={KeyboardArrowDownOutlinedIcon}
                id="countryCode"
                onChange={handleChange}
                value={countryCode}
                name="countryCode"
                renderValue={(v) => getCountryFromCode(v)}
                onBlur={handleBlur}
              >
                {countryCodes.map((code) => (
                  <MenuItem key={code} value={code}>
                    {getCountryFromCode(code)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <HelperText error>
              {!!touched?.countryCode ? errors.countryCode : ""}
            </HelperText>
          </Stack>

          <Stack position="relative">
            <FormControl fullWidth focused={false}>
              <FormLabel>Fruit:</FormLabel>
              <OutlinedInput
                type="text"
                name="name"
                onChange={handleChange}
                value={name}
                onBlur={handleBlur}
              />
            </FormControl>
            <HelperText error>{!!touched?.name ? errors.name : ""}</HelperText>
          </Stack>

          <Stack position="relative">
            <FormControl fullWidth focused={false}>
              <FormLabel>Price:</FormLabel>
              <OutlinedInput
                type="number"
                name="price"
                onChange={handleChange}
                value={price}
                onBlur={handleBlur}
              />
            </FormControl>
            <HelperText error>
              {!!touched?.price ? errors.price : ""}
            </HelperText>
          </Stack>

          <FormControl fullWidth focused={false}>
            <FormLabel>Icon:</FormLabel>
            <Stack width="100%">
              <Button
                variant="contained"
                color="secondary"
                sx={{ textTransform: "lowercase", width: 130 }}
              >
                upload icon
              </Button>
            </Stack>
          </FormControl>
        </Stack>
        <Stack
          bgcolor="#3C0054"
          width="81.5%"
          height={150}
          borderRadius={3}
          marginLeft="auto"
          justifyContent="center"
          alignItems="center"
        >
          <Stack color="gray" alignItems="center">
            <ImageOutlinedIcon fontSize="large" />
            <Stack>icon preview</Stack>
          </Stack>
        </Stack>
        <FormControl fullWidth focused={false}>
          <FormLabel>Icon URL:</FormLabel>
          <OutlinedInput
            type="text"
            placeholder="If you don't have local picture, please input icon URL."
            onChange={handleChange}
            value={imageUrl}
            name="imageUrl"
          />
        </FormControl>
        <Stack position="relative">
          <FormControl
            fullWidth
            focused={false}
            sx={{ alignItems: "baseline" }}
          >
            <FormLabel>Description:</FormLabel>
            <OutlinedInput
              type="text"
              multiline
              name="description"
              onChange={handleChange}
              value={description}
              onBlur={handleBlur}
            />
          </FormControl>
          <HelperText error>
            {!!touched?.description ? errors.description : ""}
          </HelperText>
        </Stack>

        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ width: 100 }}
            onClick={() => toggleAction("add")}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            sx={{ width: 100 }}
            onClick={() => {
              handleSubmit();
              toggleAction("add");
            }}
            disabled={
              !!Object.keys(errors).length ||
              Object.keys(touched).length < 4 ||
              price === 0
            }
          >
            Save
          </Button>
        </Stack>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={() => setError(null)}
          message={error}
        />
      </ModalContent>
    </Modal>
  );
};

export default AddItem;
