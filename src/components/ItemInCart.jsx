import React from 'react';

function ItemInCart({ id, title, image, author, onRemoveItem }) {
  return (
    <div className="flex w-full items-center gap-10 mt-3">
      <div className="flex items-center gap-10">
        <img className="w-32 max-md:w-8" src={image} alt={title} />
        <div>
          <span className="block font-bold">{title}</span>
          <span className="block text-sm text-gray-600">{author}</span> {/* اسم المؤلف */}
        </div>
      </div>

      <div className="flex flex-col">
        <div className="text-red-800 underline cursor-pointer" onClick={() => onRemoveItem(id)}>
          Remove
        </div>
      </div>
    </div>
  );
}

export default ItemInCart;
