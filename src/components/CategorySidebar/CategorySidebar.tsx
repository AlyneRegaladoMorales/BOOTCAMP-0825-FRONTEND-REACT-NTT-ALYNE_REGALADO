import type { Category } from "../../model/Category";
import { Arrow, Item, List, Sidebar } from "./CategorySidebar.styled";

interface Props {
  categories: Category[];
  currentCat: string;
  onSelect: (slug: string) => void;
}
const CategorySidebar = ({ categories, currentCat, onSelect }: Props) => {
  return (
    <Sidebar>
      <List>
        <Item
          active={currentCat === "all"}
          onClick={() => onSelect("all")}
        >
          All Products
        </Item>
        {categories.map((c) => (
          <Item
            key={c.slug}
            active={currentCat === c.slug}
            onClick={() => onSelect(c.slug)}
          >
            {c.name}
            <Arrow>›</Arrow>
          </Item>
        ))}
      </List>
    </Sidebar>
  );
};

export default CategorySidebar;