import { ReflectionInputPort } from "./port/ReflectionInputPort";

export class ReflectionUsecase {
  constructor(private inputPort: ReflectionInputPort) {}
  getAll() {
    return this.inputPort.getAll();
  }
}
