import { useRef, useState } from 'react'
import './App.css'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'

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
    items: [] as Task[]
  },
  {
    name: 'Terminated',
    id: '3456',
    items: [] as Task[]
  },

]

interface Task {
  id: string;
  content: string;
}


interface IColumn {
  id: string;
  name: string;
  items: Task[]
}

function App() {
  const [columns, setColumns] = useState<IColumn[]>(initialColumns);
  const draggableRef = useRef();
  const drroppableRef = useRef();

  function handleOnDragEnd(result: DropResult) {
    const { destination, source, draggableId } = result;
    
    if(!destination) return;

    console.log(result)

    // localiza à coluna do kaban em movimento e o respectivo elemento.
    const kaban: IColumn[] = JSON.parse(JSON.stringify(columns));
    const columnSelect = kaban.filter(column => column.id === source.droppableId)[0];
    const draggedItem = columnSelect.items.filter((item, index) => index === source.index)[0];
    
    // verifica para onde draggedItem está sendo movido.
    
    // caso 1: se estiver sendo movido para o mesmo local, não faz nada.
    if(source.droppableId === destination.droppableId 
      && source.index === destination.index) return;

    // caso seja dentro da mesma coluna em uma posição diferente, modifica o array
    if(source.droppableId === destination.droppableId 
      && source.index !== destination.index) {
        // filtra o draggedItem da coluna e o coloca no destino correto
        let filteredDraggedItem = columnSelect.items.filter(item => draggedItem.id !== item.id);
        filteredDraggedItem.splice(destination.index, 0, draggedItem);

        columnSelect.items = filteredDraggedItem;

        const updatedKaban = kaban.map(columns => {
          if(columns.id === columnSelect.id) {
            return {
              ...columnSelect
            }
          }

          return columns
        });

        setColumns(updatedKaban);
      }


    // caso seja em uma coluna diferente outra lógica
    if(source.droppableId !== destination.droppableId) {
        
        let filteredDraggedItem = columnSelect.items.filter(item => draggedItem.id !== item.id); 
        columnSelect.items = filteredDraggedItem;

        const updatedKaban1 = kaban.map(columns => {
          if(columns.id === columnSelect.id) {
            return {
              ...columnSelect
            }
          }

          return columns
        });

        setColumns(updatedKaban1);
        
        // se a a coluna for diferente preciso saber qual é a destinataria e inserir
        const destinaitonColumn = kaban.filter(column => column.id === destination.droppableId)[0];
        
        destinaitonColumn.items.push(draggedItem);       

        const updatedKaban2 = kaban.map(columns => {
          if(columns.id === destinaitonColumn.id) {
            return {
              ...destinaitonColumn
            }
          }

          return columns
        });

        setColumns(updatedKaban2);
    }
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
    
                <div style={{ backgroundColor: '#333', height: '600px', display: 'flex', flexDirection: 'column', gap: '4px', padding: '16px'}}>
                  
                  {column.items.map((task, index) => (
                   <Draggable draggableId={task.id} index={index} key={task.id}>
                      {(provided, snapshot) => (
                        <div 
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps} 
                          // isDragging={snapshot.isDragging} styled.component
                          style={{ 
                            border: '2px solid #d54689', 
                            borderRadius: '8px', 
                            padding: '12px', 
                            width: '300px',
                            backgroundColor: `${snapshot.isDragging ? "lightgreen" : "transparent"}`,
                            ...provided.draggableProps.style
                          }}>
                          {task.content}
                        </div>
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
