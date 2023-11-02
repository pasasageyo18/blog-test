import Link from "next/link";
import Image from "next/image";
function TopBar() {
  return (
    <div className="fixed top-0 z-30 flex w-full border-b bg-black border-b-slate-50/10 px-16 py-8">
      <Link href={"/"}>
        <Image src="/assets/icons/home.svg" alt="logo" width={28} height={28} />
      </Link>
    </div>
  );
}

export default TopBar;
