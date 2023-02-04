import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-800 px-4 py-2 h-12 flex items-center justify-between">
      <div className="flex items-center">
        {session && (
          <h1 className="text-md text-white mr-4">
            Welcome, <span className="text-teal-500">{session.user.name}</span>
          </h1>
        )}
      </div>
      {session && (
        <button
          className="bg-transparent text-white text-md font-bold py-2 px-4 rounded"
          onClick={() => signOut()}>Sign out</button>
      )}
    </nav>
  );
};

export default Navbar;
