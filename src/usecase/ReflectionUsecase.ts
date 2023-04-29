import { ReflectionInputPort } from "./port/ReflectionInputPort";
import { Reflection } from "../domain/Reflection";

export class ReflectionUsecase {
  constructor(private inputPort: ReflectionInputPort) {}
  getAll() {
    return this.inputPort.getAll();
  }

  addLog(reflection: Reflection) {
    console.log("ReflectionUsecase.addLog");
    console.log(reflection);
    return this.inputPort.addLog(reflection);
  }
}
