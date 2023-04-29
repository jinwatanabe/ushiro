import { describe, it, expect, vi } from "vitest";
import { ReflectionUsecase } from "../../usecase/ReflectionUsecase";
import { ReflectionInputPort } from "../../usecase/port/ReflectionInputPort";
import { Reflection } from "../../domain/Reflection";

describe("reflectionUsecase", () => {
  it("行のデータが返ってくること", async () => {
    const inputPortMock = {} as ReflectionInputPort;
    const expected = [
      new Reflection("1", new Date(), "test", "KPT", "FDL", "FuriFuri"),
      new Reflection("2", new Date(), "test", "KPT", "FDL", "FuriFuri"),
    ];
    inputPortMock.getAll = vi.fn(async () => {
      return expected;
    });

    const target = new ReflectionUsecase(inputPortMock);
    const actual = await target.getAll();

    expect(actual).toBe(expected);
  });
});
