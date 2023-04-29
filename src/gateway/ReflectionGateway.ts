import { Reflection } from "../domain/Reflection";
import { ReflectionInputPort } from "../usecase/port/ReflectionInputPort";
import { ReflectionDriver, ResponseJson } from "../driver/ReflectionDriver";

export class ReflectionGateway implements ReflectionInputPort {
  constructor(readonly driver: ReflectionDriver) {}
  async getAll(): Promise<Reflection[]> {
    const response = await this.driver.getAll();
    return response.map((res: ResponseJson) => {
      return new Reflection(
        res.link,
        res.infotech,
        res.ideatech,
        res.reflectiontech,
        res.memo,
        res.id,
        new Date(res.createdat)
      );
    });
  }
  async addLog(reflection: Reflection): Promise<number> {
    const response = await this.driver.addLog(reflection);
    return response.status;
  }
}
