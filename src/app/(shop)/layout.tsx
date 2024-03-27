import { Footer, Sidebar, TopMenu } from "@/components";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />

      <div className="sm:px-10 px-0">{children}</div>
      <Footer />
    </main>
  );
}
