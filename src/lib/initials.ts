/** Derives up to 2 uppercase initials from a name, skipping non-alphabetic tokens (e.g. "&"). */
export function initialsOf(name: string): string {
  const letters = name.match(/[A-Za-z]+/g) ?? [];
  return letters
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}
