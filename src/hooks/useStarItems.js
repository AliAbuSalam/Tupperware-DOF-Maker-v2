import { useLazyQuery } from "@apollo/client";

import { GET_ALL_ITEMS_STAR } from "../gql/queries";
import { GET_STAR_PRICE } from "../gql/queries";

const useStarItems = () => {
  const [getStarItems, starItemsResult] = useLazyQuery(GET_ALL_ITEMS_STAR);
  const [getStarPrice, starPriceResult] = useLazyQuery(GET_STAR_PRICE);

  return {
    fetchItems: getStarItems,
    fetchPrice: getStarPrice,
    starItemsResult,
    starPriceResult
  }
};

export default useStarItems;