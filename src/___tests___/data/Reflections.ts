import { Reflection } from "../../domain/Reflection";

export const reflection = new Reflection(
  "test",
  "KPT",
  "FDL",
  "FuriFuri",
  "memo",
  "1",
  new Date("2021-01-01")
);

export const reflections = [
  new Reflection(
    "test",
    "KPT",
    "FDL",
    "FuriFuri",
    "memo",
    "1",
    new Date("2021-01-01")
  ),
  new Reflection(
    "test",
    "KPT",
    "FDL",
    "FuriFuri",
    "memo",
    "2",
    new Date("2021-01-01")
  ),
];

export const reflectionJsons = [
  {
    id: "1",
    createdat: new Date("2021-01-01").toISOString(),
    link: "test",
    infotech: "KPT",
    ideatech: "FDL",
    reflectiontech: "FuriFuri",
    memo: "memo",
    user_id: "1",
  },
  {
    id: "2",
    createdat: new Date("2021-01-01").toISOString(),
    link: "test",
    infotech: "KPT",
    ideatech: "FDL",
    reflectiontech: "FuriFuri",
    memo: "memo",
    user_id: "2",
  },
];
