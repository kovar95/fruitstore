import { FruitItem } from "@/types/FruitItem";
import getCountryFlag from "country-flag-icons/unicode";

export const getCountryFromCode = (code: string) => {
  return new Intl.DisplayNames("en", { type: "region" }).of(code);
};

export const getCountryAndFlagFromCode = (code: string) => {
  return `${getCountryFlag(code)} ${getCountryFromCode(code)}`;
};

export const mapItemsByCountry = (fruits: FruitItem[]) => {
  const obj: { [key: string]: FruitItem[] } = {};

  fruits.forEach((fruit) => {
    if (Object.keys(obj).includes(fruit.countryCode)) {
      obj[fruit.countryCode] = [...obj[fruit.countryCode], fruit];
    } else {
      obj[fruit.countryCode] = [fruit];
    }
  });

  return obj;
};
