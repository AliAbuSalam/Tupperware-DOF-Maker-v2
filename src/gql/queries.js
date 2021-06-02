import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String! $password: String!) {
    login(
      username: $username
      password: $password
    ){
      value
    }
  }
`;

export const GET_ALL_ITEMS = gql`
  query getAllItems {
    getAllItems {
      name
      id
      stock
      price
    }
  }
`;

export const ADD_ITEM = gql`
  mutation addItem($name: String! $initialAmount: Int $price: Int!){
    createItem(
      name: $name
      initialAmount: $initialAmount
      price: $price
    ){
      id
      name
      stock
      price
    }
  }
`;