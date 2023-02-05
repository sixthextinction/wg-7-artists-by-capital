import React from "react";
export default function Loading({}) {
  return (
    <div className="flex flex-col justify-content items-center h-[screen] mt-[40%] overflow-y-hidden">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-tr from-white via-teal-900 to-teal-500 animate-spin">
        <div className="h-9 w-9 rounded-full bg-slate-900"></div>
      </div>
    </div>
  );
}
