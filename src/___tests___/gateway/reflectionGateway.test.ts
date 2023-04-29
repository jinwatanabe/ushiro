import { describe, it, expect, vi } from "vitest";
import { ReflectionGateway } from "../../gateway/ReflectionGateway.ts";
import { ReflectionDriver } from "../../driver/ReflectionDriver.ts";
import { reflection, reflections } from "../data/Reflections.ts";

describe("reflectionGateway", () => {
  it("行のデータが返ってくること", async () => {
    const expected = reflections;

    const driverMock = {} as ReflectionDriver;

    driverMock.getAll = vi.fn(async () => {
      return expected;
    });

    const target = new ReflectionGateway(driverMock);
    const actual = await target.getAll();

    expect(actual).toBe(expected);
  });

  it("行に登録できること", async () => {
    const response = {
      status: 201,
      statusText: "Created",
    };
    const driverMock = {} as ReflectionDriver;
    driverMock.addLog = vi.fn(async () => response);
    const target = new ReflectionGateway(driverMock);

    const actual = await target.addLog(reflection);

    expect(actual).toBe(201);
  });
});
