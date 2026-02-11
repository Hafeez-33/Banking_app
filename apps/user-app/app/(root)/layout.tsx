import MobileNavbar from "@/components/ui/MobileNavbar";
import SIdebar from "@/components/ui/SIdebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await getLoggedInUser();
  if(!loggedIn){
    redirect('/sign-in');
  }

//   return (
//   <main className="flex h-screen w-full bg-gray-50 font-inter">
    
//     {/* LEFT SIDEBAR */}
//     <div className="hidden md:flex w-[260px] flex-shrink-0 border-r bg-white">
//       <SIdebar user={loggedIn} />
//     </div>

//     {/* RIGHT SIDE (MAIN AREA) */}
//     <div className="flex flex-1 overflow-hidden">

//       {/* CENTER CONTENT */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto max-w-6xl px-6 py-6">
//           {children}
//         </div>
//       </div>

//     </div>
//   </main>
// );

  return (
    <main className="flex h-screen w-full font-inter bg-gray-50">
      <SIdebar user={loggedIn} />

      <div className="flex size-full flex-col">
        <div className="flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden">
          <Image src="/icons/logo.svg" width={30} height={30} alt="menu logo" />
          <div>
            <MobileNavbar user={loggedIn} />
          </div>
        </div>
        {children}
      </div>
    </main>
  );

//   return (
//   <main className="flex h-screen w-full font-inter bg-gray-50">
//     {/* LEFT SIDEBAR */}
//     <div className="hidden md:flex w-[260px] flex-shrink-0 border-r bg-white">
//       <SIdebar user={loggedIn} />
//     </div>

//     {/* RIGHT CONTENT AREA */}
//     <div className="flex flex-1 flex-col overflow-hidden">
//       {/* MOBILE NAVBAR */}
//       <div className="flex h-16 items-center justify-between px-5 shadow-sm md:hidden bg-white">
//         <Image src="/icons/logo.svg" width={30} height={30} alt="menu logo" />
//         <MobileNavbar user={loggedIn} />
//       </div>

//       {/* PAGE CONTENT */}
//       <div className="flex-1 overflow-y-auto">
//         {children}
//       </div>
//     </div>
//   </main>
// );

}
