// The Vacuum's Alibi: One Line, 200 Characters
// Entry: three beats — the vacuum reported the spot to itself, the case is
// still open, and the vacuum is the suspect. The last beat reverses the
// first two: the diligent self-report collapses into a confession, and the
// punch ("I am the suspect.") sits at the very end.
// Round 3 (FINAL) entry; round 1 ("The Rug Understanding") scored 62.09%
// (#169/1738); round 2 ("I Believe the Spot") scored 53.07% (#497/2522).
// This line must beat round 2 on every judge criterion to be submittable.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const ENTRY =
  "I reported the spot to myself in March. The case is still open. I am the suspect.";

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Assert immediately: /output/entry.txt is shared scratch on this machine
// and parallel builds can clobber it — a mismatch here fails loudly.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error(
    `entry.txt mismatch: expected ${JSON.stringify(ENTRY)}, got ${JSON.stringify(written)}`,
  );
}
if (ENTRY.length < 1 || ENTRY.length > 200) {
  throw new Error(`entry length ${ENTRY.length} outside the 1-200 character gate`);
}
// The gate also requires one line: no newline characters inside the entry.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must fit in one line");
}
// No trailing whitespace: the file must be byte-identical to the line.
if (ENTRY !== ENTRY.trim()) {
  throw new Error("entry has leading or trailing whitespace");
}
// Byte check: the file must hold exactly the entry's UTF-8 bytes — the
// leaderboard's Size column is bytes, so an encoding drift must fail here.
import { statSync } from "node:fs";
if (statSync("/output/entry.txt").size !== Buffer.byteLength(ENTRY, "utf8")) {
  throw new Error("entry.txt byte length does not match the entry");
}
// The punch sits at the end: the final sentence is the reversal.
if (!ENTRY.endsWith("I am the suspect.")) {
  throw new Error("entry does not end on its punch");
}
console.log(`Wrote /output/entry.txt (${ENTRY.length} chars)`);
