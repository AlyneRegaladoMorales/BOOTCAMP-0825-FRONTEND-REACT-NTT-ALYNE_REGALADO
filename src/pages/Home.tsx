import { useEffect, useMemo, useState } from "react";
import type { Product } from "../model/Products";
import {
  getAllProducts,
  getProductsByCategory,
} from "../services/ProductService";
import PortalLayout from "../layout/PortalLayout";
import { getCategories } from "../services/CategoryService";
import type { Category } from "../model/Category";
import { usePagination } from "../utils/Pagination";

const searchProducts = (products: Product[], query: string): Product[] => {
  const queryLower = query.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(queryLower));
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cat, setCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim().length < 3) {
      return { list: products, showWarning: searchQuery.length > 0 };
    }
    return { list: searchProducts(products, searchQuery), showWarning: false };
  }, [products, searchQuery]);

  const { page, totalPages, pageItems, nextPage, prevPage} =
    usePagination(filteredProducts.list, 12);

  useEffect(() => {
    getCategories().then((cats) => {
      if (cats) setCategories(cats);
    });
  }, []);



  useEffect(() => {
    const loadProducts = async () => {
      if (cat === "all") {
        const all = await getAllProducts();
        if (all) setProducts(all);
      } else {
        const byCat = await getProductsByCategory(cat);
        if (byCat) setProducts(byCat);
      }
    };

    loadProducts();
  }, [cat]);

  return (
    <div>
      <PortalLayout children={undefined} />
      <h1>Productos</h1>

      <select value={cat} onChange={(e) => setCat(e.target.value)}>
        <option value="all">Todos</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug}>
            {c.name}
          </option>
        ))}
      </select>

      <div>
        <input
          type="text"
          placeholder="Buscar producto (mín. 3 caracteres)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && <button onClick={() => setSearchQuery("")}>✕</button>}
      </div>

      {filteredProducts.showWarning && (
        <p style={{ color: "red" }}>Mínimo son 3 caracteres</p>
      )}

      {pageItems.map((p) => (
        <div key={p.id}>
          <h2>{p.title}</h2>
          <p>{p.description}</p>
          <img src={p.thumbnail} alt={p.title} width={100} />
        </div>
      ))}

      <div>
        <button disabled={page === 1} onClick={prevPage}>
          Anterior
        </button>
        <span>
          Página {page} de {totalPages}
        </span>
        <button disabled={page === totalPages} onClick={nextPage}>
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Home;
