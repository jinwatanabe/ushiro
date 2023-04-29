import { Reflection } from "../../domain/Reflection";

export const reflection = new Reflection(
  "1",
  new Date(),
  "test",
  "KPT",
  "FDL",
  "FuriFuri"
);

export const reflections = [
  new Reflection("1", new Date(), "test", "KPT", "FDL", "FuriFuri"),
  new Reflection("2", new Date(), "test", "KPT", "FDL", "FuriFuri"),
];
