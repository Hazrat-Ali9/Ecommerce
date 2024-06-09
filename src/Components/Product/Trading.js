import React from 'react';
import useProduct from '../../Hook/useProduct';
import NewDetails from './Details/NewDetails';

const Trading = () => {
    const [products] = useProduct();
// Trading
  return (
    <div className="mx-5">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 gap-y-6">
        {products
          .filter((product) => product.type === "mostProduct")
          .map((product) => (
            <NewDetails key={product.id} product={product} />
          ))}
      </div>
    </div>
    );
};

export default Trading;

// Tranding Product