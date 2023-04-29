import { describe, it, expect, vi } from "vitest";
import { ReflectionGateway } from "../../gateway/ReflectionGateway.ts";
import { ReflectionDriver } from "../../driver/ReflectionDriver.ts";
import { reflections } from "../data/Reflections.ts";

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
});
