import { gql } from '@apollo/client';

const dofFragment = gql`
  fragment dofDetails on SingleDof {
    id
    owner{
      name
      consultantId
    }
    date {
      year
      month
      week
    }
    usedItems {
      itemName
      price
      numberOfItems
      totalPrice
    }
    usedItemStars {
      itemName
      price
      numberOfItems
      totalPrice
    }
    totalPriceItems
    totalPriceStars
    discount
    totalPrice
  }
`;

const itemFragment = gql`
  fragment itemDetails on Item {
    id
    name
    stock 
    price
  }
`;

const groupFragment = gql`
  fragment groupDetails on Group {
    id
      member {
        personId
        name
        isLeader
        personalInfo {
          position
        }
      }
  }
`;

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
      ...itemDetails
    }
  }
  ${itemFragment}
`;

export const ADD_ITEM = gql`
  mutation addItem($name: String! $initialAmount: Int $price: Int! $date: DateInput!){
    createItem(
      name: $name
      initialAmount: $initialAmount
      price: $price
      orderDate: $date
    ){
      ...itemDetails
    }
  }
  ${itemFragment}
`;

export const EDIT_ITEM = gql`
  mutation editItem($id: ID! $newName: String $newPrice: Int){
    editItem(
      id: $id
      newName: $newName
      newPrice: $newPrice
    ){
      ...itemDetails
    }
  }
  ${itemFragment}
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

export const GET_ALL_ITEMS_STAR = gql`
  query getAllItemsStar {
    getAllItemsStar {
      id
      name
      starCost
    }
  }
`;

export const GET_STAR_PRICE = gql`
  query getStarPrice {
    getStarPrice {
      price
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
      ...itemDetails
    }
  }
  ${itemFragment}
`;

export const REDUCE_ORDER = gql`
  mutation reduceOrder($id: ID! $numberOfItems: Int!){
    reduceOrder(
      itemId: $id
      numberOfItems: $numberOfItems
    ){
      ...itemDetails
    }
  }
  ${itemFragment}
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

export const DELETE_PERSON = gql`
  mutation deletePerson($id: ID!){
    deletePerson(id: $id){
      status
      errorMessage
    }
  }
`;

export const ADD_ITEM_STAR = gql`
  mutation addItemStar($name: String! $starCost: Int!) {
    createItemStar(
      name: $name
      starCost: $starCost
    ){
      id
      name
      starCost
    }
  }
`;

export const EDIT_ITEM_STAR = gql`
  mutation editItemStar($name: String! $starCost: Int! $id: ID!){
    editItemStar(
      id: $id
      newName: $name
      starCost: $starCost
    ){
      id
      name
      starCost
    }
  }
`;

export const DELETE_ITEM_STAR = gql`
  mutation deleteItemStar($id: ID!){
    deleteItemStar(
      id: $id
    ){
      status
      errorMessage
    }
  }
`;

export const SET_STAR_PRICE = gql`
  mutation setStarPrice($price: Int!) {
    setStarPrice(
      price: $price
    ){
      price
    }
  }
`;

export const GET_DOFS = gql`
  query getDofs($year: Int! $month: Int! $week: Int){
    getMultipleDofs(
      date: {
        year: $year,
        month: $month,
        week: $week
      }
    ){
      type
      date {
        year
        month
        week
      }
      data {
        date {
          year
          month
          week
        }
        dof {
          ...dofDetails
        }
      }
    }
  }
  ${dofFragment}
`;

export const GET_DOF = gql`
  query getDof($id: ID!){
    getDof(
      id: $id
    ){
      ...dofDetails
    }
  }
  ${dofFragment}
`;

export const SAVE_DOF = gql`
  mutation saveDof($id: ID!, $owner: ID!, $date: DateInput!, $usedItems: [UsedItemInput!]!, $usedItemStars: [UsedItemInput!]!, $discount: Float!){
    editDof(
      id: $id,
      owner: $owner,
      date: $date,
      usedItems: $usedItems,
      usedItemStars: $usedItemStars,
      discount: $discount
    ){
      dof {
        ...dofDetails
      }
      changedItems {
        ...itemDetails
      }
    }
  }
  ${dofFragment}
  ${itemFragment}
`;

export const DELETE_DOF = gql`
  mutation deleteDof($id: ID!){
    deleteDof(id: $id){
      dof {
        ...dofDetails
      }
      changedItems {
        ...itemDetails
      }
    }
  }
  ${dofFragment}
  ${itemFragment}
`;

export const CREATE_DOF = gql`
  mutation createDof(
    $owner: ID!
    $date: DateInput!
    $usedItems: [UsedItemInput!]!
    $usedItemStars: [UsedItemInput!]!
    $discount: Float
  ){
    createDof(
      owner: $owner
      date: $date
      usedItems: $usedItems
      usedItemStars: $usedItemStars
      discount: $discount
    ){
      dof {
        ...dofDetails
      }
      changedItems {
        ...itemDetails
      }
    }
  }
  ${dofFragment}
  ${itemFragment}
`;

export const GET_ALL_GROUPS = gql`
  query getAllGroups {
    getAllGroups {
      ...groupDetails
    }
  }
  ${groupFragment}
`;

export const CREATE_GROUP = gql`
  mutation createGroup(
    $leader: ID!
    $member: [ID!]!
  ){
    createGroup(
      leader: $leader
      member: $member
    ){
      ...groupDetails
    }
  }
  ${groupFragment}
`;

export const EDIT_GROUP = gql`
  mutation editGroup(
    $id: ID!,
    $leader: ID!,
    $member: [ID!]!
  ){
    editGroup(
      id: $id
      leader: $leader
      member: $member
    ){
      ...groupDetails
    }
  }
  ${groupFragment}
`;