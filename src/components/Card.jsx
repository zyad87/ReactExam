import React from 'react';
import { useNavigate } from 'react-router-dom';

function Card(props) {
  const navigate = useNavigate();

  return (
    <div className="card bg-white w-80 shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl rounded-lg overflow-hidden">
      <figure className="w-full h-44">
        <img
          className="w-full h-full object-contain p-2"  // استخدمنا object-contain لعرض الصورة بشكل كامل
          src={props.image}
          alt={props.title}
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title truncate text-lg font-semibold text-gray-800">
          {props.title}
        </h2>
        <p className="text-md text-gray-600 truncate">by {props.author}</p> {/* المؤلف */}
        <div className="card-actions justify-end mt-4">
          <button
            onClick={() => {
              navigate(`../details/${props.id}`);
            }}
            className="btn btn-primary px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
