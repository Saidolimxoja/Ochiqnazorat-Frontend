export function formatIntUz(n: number) {
  return n.toLocaleString('uz-UZ')
}

export function formatRegionLabelShort(raw: string): string {
  let s = raw.trim()
  const suffixes = [' viloyati', ' Respublikasi', ' Respublikası'] as const
  for (const suf of suffixes) {
    if (s.endsWith(suf)) {
      s = s.slice(0, -suf.length).trim()
      break
    }
  }
  return s
}
