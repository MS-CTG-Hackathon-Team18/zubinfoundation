import Image from "next/image";
import Link from "next/link";
import Logo from "../../../public/logo-modified.png";

export default function sidebar() {
  return (
    <>
      <nav className=" bg-neutral-200 text-black p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold flex-row">
            <Link
              className="flex flex-row items-center justify-between space-x-2"
              href="/"
              passHref
            >
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
          <div className="text-black text-md">
            <Link href="/about" passHref>
              <span className="p-2 cursor-pointer">About</span>
            </Link>
            <Link href="/events" passHref>
              <span className="p-2 cursor-pointer">Events</span>
            </Link>
            <Link href="/settings" passHref>
              <span className="p-2 cursor-pointer">Settings</span>
            </Link>
            <Link href="/auth/login" passHref>
              <span className="p-2 cursor-pointer">Log In</span>
            </Link>
            <Link href="/auth/signup" passHref>
              <span className="p-2 cursor-pointer">Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
