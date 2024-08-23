import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <nav className="bg-gray-800 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-lg font-bold">
            <Link href="/" passHref>
              <span className="cursor-pointer">ZubiNest</span>
            </Link>
          </div>
          <div>
            <Link href="/about" passHref>
              <span className="p-2 cursor-pointer">About</span>
            </Link>
            <Link href="/events" passHref>
              <span className="p-2 cursor-pointer">Events</span>
            </Link>
            <Link href="/auth/signin" passHref>
              <span className="p-2 cursor-pointer">Log In</span>
            </Link>
            <Link href="/auth/signup" passHref>
              <span className="p-2 cursor-pointer">Sign Up</span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="flex min-h-screen flex-col items-center justify-between p-12">
        TESTING
      </div>
    </>
  );
}
