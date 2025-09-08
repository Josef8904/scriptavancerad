import React from "react";

const ArticleCard = ({ title, body, isLocal, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition flex flex-col">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600 flex-grow">{body}</p>

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
