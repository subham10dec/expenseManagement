import { MAX_CHARACTER_DESCIPTION_LENGTH } from "./constant";

export const getFormattedPrice = (price: string) => {
  const dollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
    minimumFractionDigits: 0,
  });
  return dollar.format(+price);
};

export const getFormattedDate = (date: string) => {
  console.log(date, new Date(date));
  return new Date(date).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const getShortDescription = (description: string) => {
  return `${description.slice(0, MAX_CHARACTER_DESCIPTION_LENGTH)}${
    description.length > MAX_CHARACTER_DESCIPTION_LENGTH ? "..." : ""
  }`;
};
