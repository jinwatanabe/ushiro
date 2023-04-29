import { describe, it, expect, vi } from "vitest";
import { ReflectionGateway } from "../../gateway/ReflectionGateway.ts";
import { ReflectionDriver } from "../../driver/ReflectionDriver.ts"
import { Reflection } from "../../domain/Reflection.ts"

describe ("reflectionGateway", () => {
  it ("行のデータが返ってくること", async () => {
    const expected = [
      new Reflection("1", new Date(), "test", "KPT", "FDL", "FuriFuri"),
      new Reflection("2", new Date(), "test", "KPT", "FDL", "FuriFuri"),
    ];

    const driverMock = {} as ReflectionDriver

    driverMock.getAll = vi.fn(async () => {
      return expected
    })

    const target = new ReflectionGateway(driverMock)
    const actual = await target.getAll()

    expect(actual).toBe(expected)
  })
})