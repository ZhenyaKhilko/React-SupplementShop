import React from 'react';

type CategoriesProps = {
  activeCategory: number;
  onSelectCategory: (categoryIndex: number) => void;
};

export const Categories: React.FC<CategoriesProps> = React.memo(
  ({ activeCategory, onSelectCategory }) => {
    const categories = ['All', 'Protein', 'Gainers', 'Creatine', 'Pre Workout'];
    const onClickCategory = (categoryIndex: number) => {
      onSelectCategory(categoryIndex);
    };

    return (
      <div className="categories">
        <ul>
          {categories.map((category, index) => {
            return (
              <li
                key={index}
                className={activeCategory === index ? 'active' : ''}
                onClick={() => onClickCategory(index)}
              >
                {category}
              </li>
            );
          })}
        </ul>
      </div>
    );
  },
);
