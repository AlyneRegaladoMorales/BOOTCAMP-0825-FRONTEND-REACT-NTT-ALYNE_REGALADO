import { useEffect, useState } from "react";
import type { Product } from "../interface/Products";
import { getAllProducts } from "../services/ProductService";
import PortalLayout from "../layout/PortalLayout";

const Home = () => {
  const [products, setProducts] = useState<Product[] | undefined>([]);
  useEffect(() => {
    getAllProducts().then((data) => {
      setProducts(data);
    });
  }, []);


  return (
    
    <div>
      <PortalLayout children={undefined} />
      <h1>Esta es la pagina principal</h1>
        {(products ?? []).map((p)=>(
            <div key={p.id}>
                <h2>{p.title}</h2>
                <p>{p.description}</p>
                <img src={p.thumbnail} alt={p.title} width={100}/>
            </div>
        ))}
    </div>
  );
};

export default Home;
