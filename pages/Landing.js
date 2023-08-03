import Link from "next/link";
import { ImSpoonKnife } from "react-icons/im";
import { MdMobileFriendly } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";

export default function Landing() {
  return (
    <>
        <div className="md:block hidden">
          <img src="1.svg"
            className="z-10 lg:h-[55vh] xl:h-[60vh] absolute bottom-32 right-0 lg:right-42 xl:right-36 2xl:right-46"
            alt=""
          />
        </div>
        <div className="font-poppins bg-primary text-secondary flex justify-center md:justify-normal my-4 md:my-0">
          <div className="flex md:mt-20 lg:mt-0  md:ml-5 mr-10 lg:ml-9  md:mr-0 md:w-1/2 h-[100vh] flex-col justify-center items-center z-10">
            <div className="mt-32 max-w-xl">
              <div className="text-text text-4xl sm:text-7xl font-extrabold">Order Your</div>
              <div className="text-text text-4xl sm:text-5xl font-bold mt-4">
                <span className="text-[#f9a825]">Favourite</span> Food!
              </div>
              <div className="text-md sm:text-md mt-4">
              Say goodbye to waiting in long queues and struggling to catch the attention of busy servers!
              </div>
              <Link href={"/menu/Table1?rest=w8zH00EwE2gk0UNyIlwi4ScOMOh1"}>
                <div className="text-secondary text-xl text-center my-24 mx-auto hover:cursor-pointer font-bold p-3 w-[18rem] rounded-xl border-[3px] border-secondary hover:bg-secondary hover:text-white transition-all duration-300">
                  Menu
                </div>
              </Link>
            </div>
          </div>
          <div className="md:block z-0 hidden md:w-1/2 xl:w-1/3 bg-[#e6e6e6] h-full absolute right-0 rounded-l-full"></div>
        </div>
    </>
  );
}
