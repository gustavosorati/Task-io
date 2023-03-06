import { useRef, useState } from 'react'
import './App.css'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { draggableControl } from './functions/draggable-control'
import { IColumns, ITask } from './interfaces/ITodo'
import { Task } from './components/Task'

const initialTasks = [
  { id: "task-1", content: "Take out the garbage"},
  { id: "task-2", content: "Watch my favorite show"},
  { id: "task-3", content: "Charge my phone"},
  { id: "task-4", content: "Cook dinner"},
]

const initialColumns = [
  {
    name: 'To-do',
    id: '1234',
    items: initialTasks
  },
  {
    name: 'Doing',
    id: '2345',
    items: [] as ITask[]
  },
  {
    name: 'Terminated',
    id: '3456',
    items: [] as ITask[]
  },
]


function App() {
  const [columns, setColumns] = useState<IColumns[]>(initialColumns);

  function handleOnDragEnd(result: DropResult) {
    const updatedColumns = draggableControl({result, originalColumns: columns});
    
    if(updatedColumns) setColumns(updatedColumns);
  }

  return (
    <div className="App" style={{ display: 'flex', gap: '60px'}}>

      <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
        
        {columns.map((column) => (
          <div style={{ display: 'flex', flexDirection: 'column'}} key={column.id}>
          <h1>{column.name}</h1>

          <Droppable droppableId={column.id}>
            {(provided) => (

              <div ref={provided.innerRef} {...provided.droppableProps}>
                
                <div style={{ backgroundColor: '#F3F5F6', height: '600px', display: 'flex', flexDirection: 'column', gap: '20px', padding: '16px'}}>
                  
                  {column.items.map((task, index) => (
                   <Draggable draggableId={task.id} index={index} key={task.id}>
                      
                      {(provided, snapshot) => (
                        <Task 
                          task={task} 
                          provided={provided} 
                          snapshot={snapshot} 
                        />
                      )}

                    </Draggable>       
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          </div>
        ))}
      </DragDropContext>
    </div>



  )
}

export default App;



// function handleOnDragEnd(result: DropResult) {
//   const { destination, source, draggableId } = result;
  
//   if(!destination) return;

//   // localiza à coluna em movimento e o respectivo elemento
//   const kabanColumns: IColumn[] = JSON.parse(JSON.stringify(columns));
//   const selectedColumn = kabanColumns.filter(column => column.id === source.droppableId)[0];
//   const draggedTask = selectedColumn.items.filter((item, index) => index === source.index)[0];
  
//   // console.log('COLUNAS => ', kabanColumns);
//   // console.log('COLUNA ESPECIFICA => ', selectedColumn);
//   // console.log('TASK ESPECIFICA => ', draggedTask);
  
//   // caso 1: se não ocorre movimento.
//   if(source.droppableId === destination.droppableId 
//     && source.index === destination.index) return;

//   // caso 2: se movimento ocorre dentro da selectedColumn em uma posição diferente, modifica o array.
//   if(source.droppableId === destination.droppableId 
//     && source.index !== destination.index) {

//       console.log('CASE 2 : ');

//       const updatedColumn = selectedColumn;
//       // cria uma lista de tasks nova sem objeto draggedTask
//       let filteredDraggedItems = updatedColumn.items.filter(item => draggedTask.id !== item.id);

//       filteredDraggedItems.splice(destination.index, 0, draggedTask);

//       updatedColumn.items = filteredDraggedItems;

//       const updatedKabanColumns = kabanColumns.map(columns => {
//         if(columns.id === updatedColumn.id) {
//           return {
//             ...updatedColumn
//           }
//         }

//         return columns;
//       });

//       setColumns(updatedKabanColumns);
//     }


//   // caso 3: se movimento é para uma da source != destination
//   if(source.droppableId !== destination.droppableId) {
//     console.log('CASE 3 : ');      

//     // Encontra a coluna de destino
//     const updatedColumn = selectedColumn;
//     const destinationColumn = kabanColumns.filter(column => column.id === destination.droppableId)[0];
    
//     // caso 03.01 - coluna vazia, apenas faz a inserção
//     if(destinationColumn.items.length === 0) {
//       console.log('CASE 3.1 =>')

//       // inseri a task na nova tabela
//       destinationColumn.items.push(draggedTask);

//       // remove a task da tabela anterior
//       let filteredDraggedItems = updatedColumn.items.filter(item => draggedTask.id !== item.id); 
      
//       updatedColumn.items = filteredDraggedItems;

//       let updatedKabanColumns = kabanColumns.map(columns => {
//         if(columns.id === updatedColumn.id) {
//           return {
//             ...updatedColumn
//           }
//         }

//         return columns;
//       });

//       setColumns(updatedKabanColumns);
//     } else if(destinationColumn.items.length > 0) {
//       console.log(destinationColumn.items.length )
//       console.log(destination.index)
//       console.log('CASE 3.2 =>')
//       // Remove da coluna inicial
//       let filteredDraggedItems = updatedColumn.items.filter(item => draggedTask.id !== item.id);
//       updatedColumn.items = filteredDraggedItems;
//       // // inseri na coluna nova
//       destinationColumn.items.splice(destination.index, 0, draggedTask);

//       let updatedKabanColumns = kabanColumns.map(columns => {
//         if(columns.id === updatedColumn.id) {
//           return {
//             ...updatedColumn
//           }
//         }

//         if(columns.id === destinationColumn.id){
//           return {
//             ...destinationColumn
//           }
//         }

//         return columns;
//       });

//       setColumns(updatedKabanColumns);
//     }
//   }

// }
