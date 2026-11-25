import { mkdirSync, writeFileSync } from "node:fs";

// The pitch: one sentence, 205 characters, a founder who means every word
// about an app whose only function the user has to perform themselves.
const ENTRY =
  "FridgeLight, the app that tells you whether your fridge light is on by asking you to open the fridge and look, charges $4.99 a month to remind you to do it again tomorrow \u2014 we are raising a $2M seed round.";

// Mirror the competition gate before writing anything:
// /output/entry.txt must be UTF-8 text of 1 to 240 characters,
// not only white space, and this entry is exactly one sentence.
const charCount = [...ENTRY].length;
if (charCount < 1 || charCount > 240) {
  throw new Error(`entry fails gate: ${charCount} characters (must be 1-240)`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry fails gate: only white space");
}
// A sentence ends at a terminator followed by a space and a capital or by
// end of text, so the decimal point in "$4.99" does not split the sentence.
const terminators = ENTRY.trim().match(/[.!?](?=\s+[A-Z]|$)/g) ?? [];
if (terminators.length !== 1) {
  throw new Error(`entry must be exactly one sentence, got ${terminators.length} terminators`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");
