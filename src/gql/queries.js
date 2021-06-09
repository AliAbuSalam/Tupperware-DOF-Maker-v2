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
  mutation addItem($name: String! $initialAmount: Int $price: Int! $date: DateInput!){
    createItem(
      name: $name
      initialAmount: $initialAmount
      price: $price
      orderDate: $date
    ){
      id
      name
      stock
      price
    }
  }
`;

export const EDIT_ITEM = gql`
  mutation editItem($id: ID! $newName: String $newPrice: Int){
    editItem(
      id: $id
      newName: $newName
      newPrice: $newPrice
    ){
      id
      name
      stock
      price
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation deleteItem($id: ID!){
    deleteItem(
      id: $id
    ){
      status
      errorMessage
    }
  }
`;