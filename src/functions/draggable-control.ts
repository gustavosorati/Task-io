import { DropResult } from 'react-beautiful-dnd'
import { IColumns } from '../interfaces/ITodo';

interface Props {
  result: DropResult;
  originalColumns: IColumns[];
}

export function draggableControl({result, originalColumns}: Props): IColumns[] | undefined {
  const { destination, source, draggableId } = result;
    
  if(!destination) return;

  const columns: IColumns[] = JSON.parse(JSON.stringify(originalColumns));
  const sourceColumn = columns.filter(column => column.id === source.droppableId)[0];
  const draggedTask = sourceColumn.items.filter((item, index) => index === source.index)[0];

  // case 1
  if(source.droppableId === destination.droppableId 
    && source.index === destination.index) return;

  // case 2
  if(source.droppableId === destination.droppableId 
    && source.index !== destination.index) {

    let filteredDraggedItems = sourceColumn.items.filter(item => draggedTask.id !== item.id);

    filteredDraggedItems.splice(destination.index, 0, draggedTask);

    sourceColumn.items = filteredDraggedItems;

    const updatedColumns = columns.map(columns => {
      if(columns.id === sourceColumn.id) {
        return {
          ...sourceColumn
        }
      }

      return columns;
    });

    return updatedColumns;
  }

  // case 3
  if(source.droppableId !== destination.droppableId) {
    const destinationColumn = columns.filter(column => column.id === destination.droppableId)[0];

    // case 3.1
    if(!destinationColumn.items.length) {
      destinationColumn.items.push(draggedTask);
  
      let filteredDraggedItems = sourceColumn.items.filter(item => draggedTask.id !== item.id); 
          
      sourceColumn.items = filteredDraggedItems;
  
      const updatedColumns = columns.map(columns => {
        if(columns.id === sourceColumn.id) {
          return {
            ...sourceColumn
          }
        }

        if(columns.id === destinationColumn.id) {
          return {
            ...destinationColumn
          }
        }
  
        return columns;
      });
  
      return updatedColumns;
    } else if(destinationColumn.items.length > 0) {
      // case 3.2
      let filteredDraggedItems = sourceColumn.items.filter(item => draggedTask.id !== item.id);
      sourceColumn.items = filteredDraggedItems;

      destinationColumn.items.splice(destination.index, 0, draggedTask);
  
      const updatedColumns = columns.map(columns => {
        if(columns.id === sourceColumn.id) {
          return {
            ...sourceColumn
          }
        }

        if(columns.id === destinationColumn.id) {
          return {
            ...destinationColumn
          }
        }
  
        return columns;
      });

      return updatedColumns;
    }
  }
}
