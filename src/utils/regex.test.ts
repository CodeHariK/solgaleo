import { expect, test } from "bun:test";
import { Pattern } from "./regex";

const telNumbers = [
    "123",
    "+123",
    ".123",
    "123-",
    "123-45",
    "123-45.",
    "123-45-2",
    "123.2",
    "123.2.5",
    "123-452-2",
    "+123456789",
    "123-456-7890",
    "(123) 456-7890",
    "+1(234)567-8901"
];

test("tel test", () => {
    telNumbers.map((input) => {
        expect(Pattern.Tel.test(input)).toBe(true);
    }
    )
});
