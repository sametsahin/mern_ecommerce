/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import { Link } from "react-router-dom";

const Products = ({ products }) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8">
        {products?.map((product) => (
          <>
            {/* new */}
            <div
              className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75"
              key={product?._id}
            >
              <div className="relative bg-gray-50">
                <span className="absolute top-0 left-0 ml-6 mt-6 px-2 py-1 text-xs font-bold font-heading bg-white border-2 border-red-500 rounded-full text-red-500">
                  -15%
                </span>
                <Link
                  className="block"
                  to={{
                    pathname: `/products/${product?.id}`,
                    // state: {
                    //   product: product,
                    // },
                  }}
                >
                  <img
                    className="w-full h-64 object-cover"
                    src={product?.images[0]}
                    alt
                  />
                  <div className="px-6 pb-6 mt-8">
                    <div className="block px-6 mb-2">
                      <h3 className="mb-2 text-xl font-bold font-heading">
                        {product?.name}
                      </h3>
                      <p className="text-lg font-bold font-heading text-blue-500">
                        <span>${product?.price}</span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Products;
