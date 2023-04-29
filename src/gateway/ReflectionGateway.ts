import { Reflection } from "../domain/Reflection";
import { ReflectionInputPort } from "../usecase/port/ReflectionInputPort";
import { ReflectionDriver } from "../driver/ReflectionDriver";

export class ReflectionGateway implements ReflectionInputPort {
  constructor(
    readonly driver: ReflectionDriver
  ) {}
  getAll(): Promise<Reflection[]> {
    return this.driver.getAll()
  }
}
