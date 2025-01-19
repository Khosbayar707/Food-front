import { MainHeader } from "../_component/MainHeader";
import { MainFooter } from "../_component/MainFooter";

export default function WebLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <MainFooter />
    </>
  );
}
