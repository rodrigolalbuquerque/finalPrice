import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="z-90 relative bg-white shadow-md ">
      <div className="container mx-auto px-4 py-2">
        <ul className="flex space-x-8 text-gray-700">
          <li className="cursor-pointer hover:text-black">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link href={"/products"}>Produtos</Link>
          </li>
          <li className="cursor-pointer hover:text-black">
            <Link href={"/groceries"}>Compras</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
