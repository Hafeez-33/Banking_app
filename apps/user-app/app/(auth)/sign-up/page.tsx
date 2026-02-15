// import Authform from "@/components/ui/Authform";
// import React from "react";

// const SignUp = async() => {

//   return (
//     <section className="flex justify-center size-full max-sm:px-6">
//       <Authform type="sign-up" />
//     </section>
//   );
// };

// export default SignUp;

import Authform from "@/components/ui/Authform";

export default function SignUp() {
  return (
    <section className="flex justify-center size-full max-sm:px-6">
      <Authform type="sign-up" />
    </section>
  );
}
