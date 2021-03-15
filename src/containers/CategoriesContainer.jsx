import React, { useEffect } from 'react';
import Categories from '../components/Categories';

const CategoriesContainer = (props) => {
  //pass in state via props
  const { categories, setCategories, setChosenCategory } = props;

  useEffect(() => {
    const getCategories = () => {
      // OpenTriviaDB API
      const apiURL = `https://opentdb.com/api_category.php`;

      fetch(apiURL)
        .then((res) => {
          return res.json();
        })
        .then((cat) => {
          setCategories(
            cat.trivia_categories.map((cat) => {
              //stores each category in an object to later be mapped
              const formattedCategories = {
                category: cat.name,
                id: cat.id,
              };
              return formattedCategories;
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getCategories((category) => setCategories({ category: category }));
  }, [setCategories]);
  return (
    <Categories categories={categories} setChosenCategory={setChosenCategory} />
  );
};

export default CategoriesContainer;
