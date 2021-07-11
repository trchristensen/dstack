import { Button, ButtonGroup } from "@chakra-ui/button";
import { HStack, Text } from "@chakra-ui/layout";
import React from "react";

const FilterBar = ({ handleClick = null}) => {


  // trending;
  // hot;
  // created;
  // promoted;
  // payout;
  // payout_comments;
  // muted;

  return (
    <React.Fragment>
      <ButtonGroup id="filter-bar" bg="gray.300" isAttached rounded="md" spacing={0}>
        <Button
          onClick={(e) => handleClick(e)}
          value="hot"
          p={2}
          py={1}
        >
          Hot
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="trending"
          p={2}
          py={1}
        >
          Trending
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="created"
          p={2}
          py={1}
        >
          Created
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="promoted"
          p={2}
          py={1}
        >
          Promoted
        </Button>
        <Button onClick={(e) => handleClick(e)} value="payout" p={2} py={1}>
          Payout
        </Button>
      </ButtonGroup>
    </React.Fragment>
  );
};

export default FilterBar;
