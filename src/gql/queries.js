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

export const ADD_ORDER = gql`
  mutation addOrder($id: ID! $date: DateInput! $numberOfItems: Int!){
    addOrder(
      itemId: $id
      orderDate: $date
      numberOfItems: $numberOfItems
    ){
      id
      name
      stock
      price
    }
  }
`;

export const REDUCE_ORDER = gql`
  mutation reduceOrder($id: ID! $numberOfItems: Int!){
    reduceOrder(
      itemId: $id
      numberOfItems: $numberOfItems
    ){
      id
      name
      stock
      price
    }
  }
`;

export const GET_ALL_PERSONNEL = gql`
  query getAllPersonnel {
    getPersons {
      id
      name
      consultantId
      position
      upline {
        id
      }
    }
  }
`;

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $consultantId: ID!, $position: Position!, $upline: ID){
    createPerson(
      name: $name
      consultantId: $consultantId
      position: $position
      upline: $upline
    ){
      id
      name
      consultantId
      position
      upline {
        id
      }
    }
  }
`;

export const EDIT_PERSON = gql`
  mutation editPerson(
    $id: ID!
    $name: String
    $consultantId: String
    $position: Position
    $upline: ID
  ){
    editPerson(
      id: $id,
      newName: $name,
      consultantId: $consultantId,
      position: $position
      upline: $upline
    ){
      id
      name
      consultantId
      position
      upline {
        id
      }
    }
  }
`