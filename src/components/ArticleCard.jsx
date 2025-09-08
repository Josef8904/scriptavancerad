import React from "react";
import { Link } from "react-router-dom";

const ArticleCard = ({ id, title, body, isLocal, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition flex flex-col">

      <Link to={`/article/${id}`}>
        <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:underline">
          {title}
        </h3>
      </Link>

      <p className="text-gray-600 flex-grow">{body.substring(0, 120)}...</p>

      {isLocal && (
        <button
          onClick={onDelete}
          className="mt-4 self-end bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
        >
          Radera
        </button>
      )}
    </div>
  );
};

export default ArticleCard;
