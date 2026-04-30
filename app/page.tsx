import Link from "next/link";

export default function page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button className="p-8 bg-lime-600 rounded-xl">
        <Link href="/dashboard">
          <p className="font-bold text-md">Enter as Admin</p>
        </Link>
      </button>
    </div>
  );
}
