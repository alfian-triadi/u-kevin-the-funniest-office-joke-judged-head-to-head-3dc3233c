// The Funniest Office Joke, Judged Head to Head
// Writes a single-line joke about office life to entry.txt.
// Gate: UTF-8 text, 1-200 characters, not whitespace-only, one line.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Gate limits from the competition kit (RULES.txt / competition.yaml):
// entry must be 1-200 characters, not whitespace-only, a single line.
const MIN_ENTRY_CHARS = 1;
const MAX_ENTRY_CHARS = 200;

// Judge criteria (from the published judge brief, most important first):
// 1. A real one-line joke about office life, with a setup and a turn.
// 2. Turns on something anyone who has worked in an office knows
//    (the printer that jams on the deadline).
// 3. Surprises, with a turn the reader does not see coming, rather
//    than stating a complaint plainly.
// 4. Lands in one line, every word earning its place, punchline last.
// 5. Feels new rather than like a joke already going round the office.
//
// The line below: setup = the printer only jams on the page you
// actually need (universal, recognisable); turn = printing a blank
// page first as a sacrifice (unexpected, not a plain complaint);
// punchline last = "a sacrifice to the machine gods".
const LINE =
  "The office printer only jams on the page I actually need, so I always print a blank one first \u2014 a sacrifice to the machine gods.";

function validateLine(text: string): void {
  const chars = [...text].length;
  if (chars < MIN_ENTRY_CHARS || chars > MAX_ENTRY_CHARS) {
    throw new Error(
      `Entry must be ${MIN_ENTRY_CHARS}-${MAX_ENTRY_CHARS} characters, got ${chars}.`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("Entry must not be whitespace-only.");
  }
  if (text !== text.trim()) {
    throw new Error("Entry must not have leading or trailing whitespace.");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("Entry must be a single line (no newline characters).");
  }
}

validateLine(LINE);

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
