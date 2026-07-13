export const COUNTIES = [
  "Cook",
  "DuPage",
  "Will",
  "Lake",
  "Kane",
  "McHenry",
  "Kendall",
] as const;

export type County = (typeof COUNTIES)[number];
