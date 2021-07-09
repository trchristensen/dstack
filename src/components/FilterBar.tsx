import { Button } from "@chakra-ui/button";
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
      <HStack bg="gray.100" rounded="md" spacing={0}>
        <Button
          onClick={(e) => handleClick(e)}
          value="hot"
          borderRightWidth={0}
          p={2}
          py={1}
        >
          Hot
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="trending"
          borderRightWidth={0}
          p={2}
          py={1}
        >
          Trending
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="created"
          borderRightWidth={1}
          p={2}
          py={1}
        >
          Created
        </Button>
        <Button
          onClick={(e) => handleClick(e)}
          value="promoted"
          borderRightWidth={1}
          p={2}
          py={1}
        >
          Promoted
        </Button>
        <Button onClick={(e) => handleClick(e)} value="payout" p={2} py={1}>
          Payout
        </Button>
      </HStack>
    </React.Fragment>
  );
};

export default FilterBar;
