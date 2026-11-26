// main.ts — Funniest Lost Sock Status Update
//
// Writes one status update, in the voice of a lost sock, to the path the
// make.fun program/v1 harness grades: /output/entry.txt. The gate accepts
// UTF-8 text of 1 to 120 characters, so the line is validated before it
// is written.
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const MAX_CHARS = 120;
const OUTPUT_PATH = "/output/entry.txt";

// Day 47 behind the dryer. I run a small lint empire now.
// Tell my partner I left him for a dust bunny named Greg.
const STATUS_UPDATE =
  "Day 47 behind the dryer. I run a small lint empire now. " +
  "Tell my partner I left him for a dust bunny named Greg.";

function main(): void {
  const line = STATUS_UPDATE.trim();
  if (line.length === 0) {
    throw new Error("status update is empty");
  }
  if (line.length > MAX_CHARS) {
    throw new Error(
      `status update is ${line.length} characters, over the ${MAX_CHARS}-character limit`,
    );
  }
  mkdirSync(dirname(OUTPUT_PATH), { recursive: true });
  writeFileSync(OUTPUT_PATH, line, "utf8");
  console.log(`wrote ${line.length} characters to ${OUTPUT_PATH}`);
}

main();
