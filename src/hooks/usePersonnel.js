import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { useSelector, useDispatch } from "react-redux";

import { GET_ALL_PERSONNEL } from "../gql/queries";
import { SET_PEOPLE } from "../reducers/personReducers";

const usePersonnel = () => {
  const personnelList = useSelector(state => state.people);
  const [getAllPersonnel, result] = useLazyQuery(GET_ALL_PERSONNEL);
  const dispatch = useDispatch();

  useEffect(() => {
    if(personnelList.length === 0){
      getAllPersonnel();
    }
  }, []);

  useEffect(() => {
    if(!result.loading && result.data){
      console.log('data: ', result.data.getPersons);
      dispatch(SET_PEOPLE(result.data.getPersons))
    }
  }, [result, dispatch]);

  return personnelList;

};

export default usePersonnel;