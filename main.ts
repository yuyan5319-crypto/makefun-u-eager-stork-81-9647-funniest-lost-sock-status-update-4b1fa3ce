// main.ts — Funniest Lost Sock Status Update
//
// Writes one status update, in the voice of a lost sock, to the path the
// make.fun program/v1 harness grades: /output/entry.txt. The gate accepts
// UTF-8 text of 1 to 120 characters, so the line is validated before it
// is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 120;
// The harness grades /output/entry.txt; ENTRY_OUTPUT_PATH lets the same
// program be run locally against a scratch path without touching /output.
const OUTPUT_PATH =
  process.env.ENTRY_OUTPUT_PATH ?? "/output/entry.txt";

// Day 47 behind the dryer. I run a small lint empire now.
// Tell my partner I left him for a dust bunny named Greg.
const STATUS_UPDATE =
  "Day 47 behind the dryer. I run a small lint empire now. " +
  "Tell my partner I left him for a dust bunny named Greg.";

function validate(line: string): void {
  if (line.length === 0) {
    throw new Error("status update is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `status update is ${line.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("status update is only white space");
  }
  if (/[\r\n]/.test(line)) {
    throw new Error("status update must be a single line");
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(line)) {
    throw new Error("status update holds control characters");
  }
}

function main(): void {
  const line = STATUS_UPDATE.trim();
  validate(line);
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
