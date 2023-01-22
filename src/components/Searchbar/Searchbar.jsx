import { Formik } from 'formik';
import { BsSearch } from 'react-icons/bs';

import {
  SearchbarHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onSubmit }) => {
  const handleSubmit = (values, { resetForm }) => {
    const searchValue = values.search;

    resetForm();
    onSubmit(searchValue.trim());
  };

  return (
    <SearchbarHeader>
      <Formik initialValues={{ search: '' }} onSubmit={handleSubmit}>
        <SearchForm>
          <SearchFormButton type="submit">
            <BsSearch />
          </SearchFormButton>
          <SearchFormInput
            type="text"
            name="search"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </Formik>
    </SearchbarHeader>
  );
};
