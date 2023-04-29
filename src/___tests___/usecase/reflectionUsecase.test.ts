import { describe, it, expect, vi } from "vitest";
import { ReflectionUsecase } from "../../usecase/ReflectionUsecase";
import { ReflectionInputPort } from "../../usecase/port/ReflectionInputPort";
import { reflection, reflections } from "../data/Reflections";

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

  it("行を登録できること", async () => {
    const inputPortMock = {} as ReflectionInputPort;
    inputPortMock.addLog = vi.fn(async () => 201);
    const target = new ReflectionUsecase(inputPortMock);

    const actual = await target.addLog(reflection);
    expect(actual).toBe(201);
  });
});
