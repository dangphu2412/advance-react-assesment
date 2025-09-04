export type Card = {
  id: number;
  name: string;
  description: string;
  tags: string[];
};

export function deleteCardByIndex(cardList: Card[], itemRemove: number): Card[] {
  return cardList.filter((card, currentItem) => currentItem !== itemRemove);
}   