import Image from "next/image";
import Link from 'next/link';
import Logo from "../../public/logo-modified.png";
import { Button } from "@/components/ui/button"

const NavigationBar = () => {
  return ( 
    <nav className="block sticky w-full h-auto top-0 bg-white text-black pt-4 z-10">
      <div className="px-12 flex justify-between items-center">

        <div className="text-lg font-bold flex-row">
          <Link className="flex flex-row items-center justify-between space-x-2" href="/" passHref>
            <Image
              src={Logo}
              alt="Picture of the author"
              width={25} //automatically provided
              height={25} //automatically provided
              // blurDataURL="data:..." automatically provided
              // placeholder="blur" // Optional blur-up while loading
            />
            <span className="cursor-pointer">ZubiNest</span>
          </Link>
        </div>
        
        <div className="text-black text-md font-sans flex items-center justify-between gap-4">
          <Link href="/about" passHref>
            <span className="p-2 cursor-pointer">About</span>
          </Link>
          <Link href="/main/events" passHref>
            <span className="p-2 cursor-pointer">Events</span>
          </Link>
          <Link href="/main/settings" passHref>
              <span className="p-2 cursor-pointer">Settings</span>
          </Link>
          <Link href="/statistics" passHref>
              <span className="p-2 cursor-pointer">Statistics</span>
          </Link>
          <Link href="/auth/login" passHref>
            <span className="p-2 cursor-pointer">Log In</span>
          </Link>
          <Link href="/auth/signup" passHref>
            <Button className=" ml-2 cursor-pointer text-md">Sign Up</Button>
          </Link>
        </div>
      </div>
    </nav>    
  );
}
 
export default NavigationBar;