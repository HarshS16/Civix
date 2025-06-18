// Utility to merge class names (like clsx or classnames)
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
} 