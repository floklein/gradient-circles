export function cn(classNames: (string | boolean)[]) {
  return classNames.filter(Boolean).join(" ");
}
