import { ReflectionDriver } from "./driver/ReflectionDriver";
import { ReflectionGateway } from "./gateway/ReflectionGateway";
import { ReflectionUsecase } from "./usecase/ReflectionUsecase";

const driver = new ReflectionDriver("reflection");
const gateway = new ReflectionGateway(driver);
export const usecase = new ReflectionUsecase(gateway);
