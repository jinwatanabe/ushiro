import { describe, it, expect, vi } from "vitest";
import { ReflectionUsecase } from "../../usecase/ReflectionUsecase";
import { ReflectionInputPort } from "../../usecase/port/ReflectionInputPort";
import { reflections } from "../data/Reflections";

describe("reflectionUsecase", () => {
  it("行のデータが返ってくること", async () => {
    const inputPortMock = {} as ReflectionInputPort;
    const expected = reflections;
    inputPortMock.getAll = vi.fn(async () => {
      return expected;
    });

    const target = new ReflectionUsecase(inputPortMock);
    const actual = await target.getAll();

    expect(actual).toBe(expected);
  });
});
