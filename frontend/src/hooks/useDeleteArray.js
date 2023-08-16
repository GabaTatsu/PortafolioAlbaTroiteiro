const useDeleteArray = ({ idDelete, editWorks }) => {
  const deleteAndReorder = () => {
    const deletedItem = editWorks.find((item) => item.id === idDelete);

    if (deletedItem) {
      const deletedOrderer = deletedItem.orderer;

      const updatedArray = editWorks.filter((item) => item.id !== idDelete);

      const finalUpdatedArray = updatedArray.map((item) => ({
        ...item,
        orderer: item.orderer > deletedOrderer ? item.orderer - 1 : item.orderer,
      }));
      
      return finalUpdatedArray; 
    }

    return editWorks; 
  };

  const finalUpdatedArray = deleteAndReorder();
  const deletedItem = editWorks.find((item) => item.id === idDelete);
  
  return { deleteAndReorder, finalUpdatedArray, deletedItem };
};

export default useDeleteArray;