import { SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/input';
import React from 'react';

const SearchBar = ({ onSearch }) => {

    const [input, setInput] = React.useState('')
    const handleSearch = (e) => {
        e.preventDefault();
        setInput('')
        onSearch(input)       
    }

    return (
      <form style={{ width: "100%" }} onSubmit={(e) => handleSearch(e)}>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.300" />}
          />
          <Input
            rounded="full"
            bg="gray.100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search"
          />
        </InputGroup>
      </form>
    );
}

export default SearchBar;