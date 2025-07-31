import MobileNavbar from "@/components/ui/MobileNavbar";
import SIdebar from "@/components/ui/SIdebar";
import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = { firstName: "Adrian", lastName: "JSM" };
  return (
    <main className="flex h-screen w-full font-inter">
      <SIdebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
          <div>
            <MobileNavbar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );
}
