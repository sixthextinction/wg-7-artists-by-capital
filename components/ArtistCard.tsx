import React from "react";

type Props = {
  name: string;
  imageUrl: string | null;
  profile: string;
};

const ArtistCard = ({ name, imageUrl, profile }: Props) => {
  return (
    <div key={name} className="bg-white p-6 rounded-lg shadow-lg">
      <img
        src={imageUrl || "https://via.placeholder.com/192"}
        alt={name}
        title={name}
        className="h-48 w-full object-cover"
      />
      <h2 className="text-lg py-2 font-medium border-b-2 border-teal-500">
        {name}
      </h2>

      {/* <p className="text-gray-700 mt-2">{profile?.substring(0, 80) + "..."}</p> */}
      <p className="text-gray-700 mt-2 line-clamp-3">{profile}</p>
    </div>
  );
};

export default ArtistCard;
