import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Landing() {
  return (
    <>
      <div className="h-screen flex flex-col">
        <div className="flex md:flex-row flex-col h-4/5  w-full space-x-5   ">
          <div className="flex flex-col justify-center items-center md:w-1/2  ">
            <div className="font-semibold my-8 ml-2">
              <div className="  text-5xl">WELCOME</div>
              <div className="text-2xl mx-2 ">
                Lets order <span className="text-[#1ac073]">FOOD</span>
              </div>
            </div>
            <Link href={"/menu/Table1"}>
              <div className="button bg-yellow-500 w-52 h-9 text-white rounded-md flex items-center justify-center my- hover:cursor-pointer">
                MENU
              </div>
            </Link>
          </div>

          <div className="flex justify-center my-10">
            <Image
              src={"dining.svg"}
              width={500}
              height={500}
              alt="logo"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
