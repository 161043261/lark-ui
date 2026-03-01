export interface DebouncedFunc<T extends (...args: unknown[]) => unknown> {
  (...args: Parameters<T>): void
  cancel: () => void
}

export default function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay?: number,
): DebouncedFunc<T>
