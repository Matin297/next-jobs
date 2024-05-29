import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Button } from "@/components/ui";

export default function Navbar() {
  return (
    <header className="p-2 shadow">
      <nav className="m-auto flex max-w-screen-lg items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image width={50} sizes="50px" src={Logo} alt="next jobs" />
          <h2 className="font-extrabold sm:text-xl">Next Jobs</h2>
        </Link>
        <Button asChild size="sm">
          <Link href="/job/create">Post Job</Link>
        </Button>
      </nav>
    </header>
  );
}
