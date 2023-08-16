const useAdArray = ({ deletedItem, editWorks }) => {
    let finalAdArray

    const adAndReorder = () => {
      let updatedDeletedItem = { ...deletedItem };
  
      updatedDeletedItem.orderer = Math.max(
        ...editWorks.map((item) => item.orderer)
      ) + 1;
      
      const finalAdArray = [
        ...editWorks,
        updatedDeletedItem,
      ];
    
      return { finalAdArray };
    };

    return { adAndReorder,finalAdArray };
  };
  
  export default useAdArray;