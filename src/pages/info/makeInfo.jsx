import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import Info from './info';


const MakeInfo = () => {
    const makeOrder = useSelector((store) => store.makeOrder.makeOrder);

    useEffect(() => {
        if (makeOrder.length === 0) {
          window.location.href = '/';
        }
      }, [makeOrder]);
  
    const products = makeOrder[makeOrder.length - 1];
  
    return <Info products={products} />;
};

export default MakeInfo