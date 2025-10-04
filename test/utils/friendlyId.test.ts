import { test, expect, describe } from "bun:test";
import friendlyId from "@/utils/friendlyId";

describe("friendlyId", () => {
  test("is 10 characters long", () => {
    expect(friendlyId()).toHaveLength(10);
  });

  test("contains only alphanumeric characters", () => {
    expect(friendlyId()).toMatch(/^[a-zA-Z0-9-_]+$/);
  });
});
