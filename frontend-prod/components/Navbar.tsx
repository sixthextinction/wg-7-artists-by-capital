import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar: React.FC = () => {
  const { data: session } = useSession();
  return (
    <nav className="bg-gray-800 px-2 py-2 h-12 flex items-center justify-end">
      <div className="flex items-center">
        {session && (
          <>
            <h1 className="text-md text-white mr-2">
              <a href={`https://github.com/${session.user.name}`}> <span className="text-teal-500">{session.user.name}</span> </a>
            </h1>
            <div
              className="w-7 h-7 rounded-full bg-cover bg-center "
              style={{ backgroundImage: `url(${session.user.image})` }}
            ></div>
          </>
        )}
      </div>
      {session && (
        <button
          className="bg-transparent text-white text-md font-bold py-2 px-4 rounded"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      )}
    </nav>
  );
};

export default Navbar;
