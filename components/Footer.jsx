import Link from "next/link";
import { useStateContext } from "@/context/stateContext";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Navbar = () => {
  return (
    <>
      <footer class="fixed left-[50%] translate-x-[-50%] bottom-0 rounded-lg bg-transparent">
        <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-center">
          <span class="font-medium text-sm text-center text-[#05386b]">
            © 2023{" "}
            <a href="https://flowbite.com/" class="hover:underline">
              TableTap™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Navbar;
