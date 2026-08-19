export function Callout({ title = "Keep in mind", children }: { title?: string; children: React.ReactNode }) {
  return <aside className="callout"><span>{title}</span><div>{children}</div></aside>;
}
