import { useEffect, useMemo, useState } from "react";
import type { Product } from "../../model/Products";
import {
  getAllProducts,
  getProductsByCategory,
} from "../../services/ProductService";
import PortalLayout from "../../layout/PortalLayout/PortalLayout";
import { getCategories } from "../../services/CategoryService";
import type { Category } from "../../model/Category";
import Modal from "../../components/Modal/Modal";
import ProductCard from "../../components/ProductCard/ProductCard";
import CategorySidebar from "../../components/CategorySidebar/CategorySidebar";
import {
  Container,
  Content,
  PageWrapper,
  ProductsGrid,
  SearchBar,
} from "./Home.styled";
import Pagination from "../../components/Pagination/Pagination";
import { usePagination } from "../../hook/Pagination";

const searchProducts = (products: Product[], query: string): Product[] => {
  const queryLower = query.toLowerCase();
  return products.filter((p) => p.title.toLowerCase().includes(queryLower));
};

const Home = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [cat, setCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const filteredProducts = useMemo(() => {
    if (searchQuery.trim().length < 3) {
      return { list: products, showWarning: searchQuery.length > 0 };
    }
    return { list: searchProducts(products, searchQuery), showWarning: false };
  }, [products, searchQuery]);

  const { page, totalPages, pageItems, nextPage, prevPage, goToPage } = usePagination(
    filteredProducts.list,
    10
  );

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
    <>
      <PortalLayout children={undefined} />
      <PageWrapper>
        <Container>
          <CategorySidebar
            categories={categories}
            currentCat={cat}
            onSelect={(slug) => setCat(slug)}
          />

          <Content>
            <SearchBar>
              <input
                type="text"
                placeholder="Buscar producto (mín. 3 caracteres)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")}>✕</button>
              )}
            </SearchBar>

            {filteredProducts.showWarning && (
              <p style={{ color: "red" }}>Mínimo son 3 caracteres</p>
            )}

            <ProductsGrid>
              {pageItems.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductsGrid>

            <Pagination
              page={page}
              totalPages={totalPages}
              onPageChange={goToPage}
              onNext = {nextPage}
              onPrev = {prevPage}

            />
          </Content>
        </Container>

        <Modal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
        />
      </PageWrapper>
    </>
  );
};

export default Home;
