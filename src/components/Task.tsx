import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd"
import { ITask } from "../interfaces/ITodo"

type Props = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  task: ITask;
} 

export function Task({provided, snapshot, task}: Props) {

  function handleOnClick() {
    console.log('clicou');
  }

  return (
    <div 
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps} 
      style={{ 
        padding: '12px', 
        color: '#363636',
        width: '300px',
        borderRadius: '12px', 
        borderWidth: '2px',
        borderStyle: "solid",
        borderColor: `${snapshot.isDragging ? 'red' : 'transparent'}`,
        boxShadow: `${snapshot.isDragging ? 'none' : '0px 8px 0px rgba(0, 0, 0, 0.15)'}`,
        backgroundColor: `${snapshot.isDragging ? "#fff" : "#fff"}`,
        ...provided.draggableProps.style
      }}
      onClick={handleOnClick}
    >
        {task.content}
    </div>
  )
}