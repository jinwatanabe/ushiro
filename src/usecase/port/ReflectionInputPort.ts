import { Reflection } from "../../domain/Reflection";

export interface ReflectionInputPort {
  getAll(): Promise<Reflection[]>;
}
