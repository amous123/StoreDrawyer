import retailCard from "../retailCard";

export const createOrder = (items, total) => ({
    type: 'CREATE_ORDER',
    payload: {
      items,
      total,
    },
  });


export const addCard = (retailCard, cards) => ({
    type: 'ADD_CARD',
    payload: {
        retailCard,
        cards,
    },
})