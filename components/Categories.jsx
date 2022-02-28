import React from 'react';

const Categories = (props) => {
  const { categories, setChosenCategory } = props;

  return (
    <>
      <select
        className='xl:w-full appearance-none rounded-large py-1'
        onChange={(e) => setChosenCategory(e.target.value)}
        defaultValue='DEFAULT'
      >
        <option value='DEFAULT' disabled className='text-center'>
          Select a Category
        </option>
        {categories.map((element, key) => (
          <option key={key} value={element.id}>
            {element.category}
          </option>
        ))}
      </select>
    </>
  );
};

export default Categories;
