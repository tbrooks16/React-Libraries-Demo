export default function TwoColumnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="m-10 grid grid-cols-2 gap-5">{children}</div>;
}
