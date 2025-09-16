import { useState } from "react";
import type { Category } from "../../model/Category";
import { Arrow, Item, List, Sidebar, ToggleButton } from "./CategorySidebar.styled";

interface Props {
  categories: Category[];
  currentCat: string;
  onSelect: (slug: string) => void;
}
const CategorySidebar = ({ categories, currentCat, onSelect }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Sidebar>
      <ToggleButton onClick={() => setOpen(!open)}>
        Categorías
        <span>{open ? "▲" : "▼"}</span>
      </ToggleButton>
      <List $mobile={open}>
        <Item
          active={currentCat === "all"}
          onClick={() => {
            onSelect("all");
            setOpen(false);
          }}

        >
          Todos los productos
        </Item>
        {categories.map((c) => (
          <Item
            key={c.slug}
            active={currentCat === c.slug}
            onClick={() => {
              onSelect(c.slug)
              setOpen(false);
            }}
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