import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import axios from 'axios';

function Search({ onSearchChange, token }) {
  const [search, setSearch] = useState('');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const handleChange = (searchData) => {
    setSearch(searchData);
    onSearchChange({
      lat: searchData.value.split(',')[0].trim(),
      lon: searchData.value.split(',')[1].trim(),
      city: searchData.label.split(',')[0].trim(),
    });
  };

  const loadOptions = async (input) => {
    try {
      const response = await axios.get(`/api/citylist?search=${input}`, config);
      return {
        options: response.data.options
      };
    } catch (error) {
      console.error(error);
      return { options: [] };
    }
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleChange}
      loadOptions={loadOptions}
      styles={{
            control: (provided, state) => ({
                ...provided,
                backgroundColor: 'transparent',
                color: '#fff',
                border: state.isFocused ? '1.5px solid #fff' : '1.5px solid #fff',
                width: '300px',
            }),
            singleValue: (provided) => ({
                ...provided,
                color: '#fff',
            }),
            placeholder: (provided) => ({
                ...provided,
                color: '#fff',
            }),
            dropdownIndicator: (provided) => ({
                ...provided,
                color: '#fff',
            }),
            indicatorSeparator: (provided) => ({
                ...provided,
                backgroundColor: '#fff',
            }),
            input: (provided) => ({
                ...provided,
                color: '#fff',
            }),
            menu: (provided) => ({
                ...provided,
                backgroundColor: '#333',
            }),
            option: (provided, state) => ({
                ...provided,
                backgroundColor: state.isFocused ? '#555' : '#333',
                color: state.isFocused ? '#fff' : '#fff',
            }),

        }}
    />
  );
}

export default Search;
