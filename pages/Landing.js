import Service from "@/components/Service";
import Link from "next/link";
import { ImSpoonKnife } from "react-icons/im";
import { MdMobileFriendly } from "react-icons/md";
import { BsFillClockFill } from "react-icons/bs";

export default function Landing() {
  return (
    <>
        <div className="md:block hidden">
          <img
            src="plate.png"
            className="z-10 lg:h-[55vh] xl:h-[80vh] absolute right-0 lg:right-42 xl:right-32 2xl:right-46 md:top-[25%] lg:top-[20%] xl:top-[15%]"
            alt=""
          />
        </div>
        <div className="font-poppins flex justify-center md:justify-normal md:mx-0 ml-4  my-4 md:my-0  md:ml-4  ">
          <div className="flex md:mt-20 lg:mt-0  md:ml-5 mr-10 lg:ml-9  md:mr-0 md:w-1/2 h-[100vh] flex-col justify-center items-center z-10">
            <div className="mt-32">
              <div className="text-4xl sm:text-5xl font-bold">Order Your</div>
              <div className="text-4xl sm:text-5xl font-light">
                Favourite Food!
              </div>
              <Link href={"/menu/Table1"}>
                <div className="my-6 hover:cursor-pointer text-black p-3 w-[18rem] hover:w-[17.8rem] rounded-full text-center text-[20px] hover:text-[19.8px] loginDiv">
                  Menu
                </div>
              </Link>
            </div>
            <div className="text-black text-4xl mt-10">Services</div>
            <div className="flex flex-col m-auto space-y-10 lg:space-x-14 lg:flex-row lg:space-y-0 lg:m-auto">
              <Service
                img={<ImSpoonKnife className="w-8 h-8" />}
                title="Best Quality"
              />
              <Service
                img={<MdMobileFriendly className="w-8 h-8" />}
                title="Self Ordering "
              />
              <Service
                img={<BsFillClockFill className="w-8 h-8" />}
                title="Fast Serving"
              />
            </div>
          </div>
          <div className="md:block z-0 hidden md:w-1/2 xl:w-1/3 bg-[#e4b145] h-full absolute right-0 rounded-l-full"></div>
        </div>
    </>
  );
}
