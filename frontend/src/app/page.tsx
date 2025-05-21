import Link from "next/link";
import ButtonField from "@/components/common/ButtonField";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 text-center">
          Task Management Platform
        </h1>
        <p className="text-gray-600 text-lg mb-8 text-center">
          Organize your tasks.<br />
          Please{" "}
          <Link href="/login" className="text-blue-600 hover:underline font-semibold">
            Login
          </Link>{" "}
          or{" "}
          <Link href="/signup" className="text-blue-600 hover:underline font-semibold">
            Sign Up
          </Link>{" "}
          to get started.
        </p>
        <div className="flex gap-4">
          <Link href="/login">
            <ButtonField className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Login
            </ButtonField>
          </Link>
          <Link href="/signup">
            <ButtonField className="px-6 py-2 border border-blue-600 rounded-lg font-semibold transition">
              Sign Up
            </ButtonField>
          </Link>
        </div>
      </div>
    </div>
  );
}
