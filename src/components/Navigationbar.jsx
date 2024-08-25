import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/logo-modified.png";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

const NavigationBar = () => {
  return ( 
    <nav className="block sticky w-full h-auto top-0 bg-white text-black py-4 z-10">
      <div className="px-12 flex justify-between items-center">
        <div className="text-lg font-bold flex-row">
          <Link className="flex flex-row items-center justify-between space-x-2" href="/" passHref>
            <Image
              src={Logo}
              alt="Picture of the author"
              width={25} //automatically provided
              height={25} //automatically provided
            />
            <span className="cursor-pointer">ZubiNest</span>
          </Link>
        </div>

        <div className="text-black text-md font-sans flex items-center justify-between gap-4">
          <Link href="/" passHref>
            <span className="p-2 cursor-pointer">About</span>
          </Link>
          <Link href="/main/events" passHref>
            <span className="p-2 cursor-pointer">Events</span>
          </Link>
          <Link href="/main/chatbot" passHref>
            <span className="p-2 cursor-pointer">Chatbot</span>
          </Link>
          <Link href="/main/dashboard" passHref>
            <span className="p-2 cursor-pointer">Dashboard</span>
          </Link>
          <Link href="/main/calendar" passHref>
            <span className="p-2 cursor-pointer">Admin Page</span>
          </Link>
          <Link href="/auth/login" passHref>
            <span className="p-2 cursor-pointer">Log In</span>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button className="ml-2 cursor-pointer text-md">Sign Up</Button>
          </Link>

          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="../../zubin_avatar.png" alt="User Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-[150px] bg-white border border-gray-200 rounded-md shadow-lg">
              <div className="p-1">
                <Link href="/main/settings" passHref>
                  <span className="block cursor-pointer p-1 rounded-md hover:bg-gray-100">Settings</span>
                </Link>
                <Link href="/main/settings" passHref>
                  <span className="block cursor-pointer p-1 rounded-md hover:bg-gray-100">My events</span>
                </Link>
                <Link href="/logout" passHref>
                  <span className="block cursor-pointer p-1 rounded-md hover:bg-gray-100">Log Out</span>
                </Link>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
