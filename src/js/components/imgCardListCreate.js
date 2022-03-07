import { ImgCard } from '../components/imgCardElement';

export const createListImg = imgListData => {
  const List = imgListData.map((imgData) => {
    return ImgCard(imgData);
  }); 
  return List;
}