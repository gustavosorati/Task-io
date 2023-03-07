import { useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import { draggableControl } from '../../functions/draggable-control'
import { IColumns, ITask } from '../../interfaces/ITodo'
import { Task } from '../../components/Task'
import * as Styled from './styles'
import { NewTaskModal } from '../../components/NewTask'
import { Plus } from '@phosphor-icons/react'

const initialTasks: ITask[] = [
  { id: "task-1", title: "Take out the garbage", description: "teste", status: "completed" },
  { id: "task-2", title: "Watch my favorite show", status: 'in progress'},
  { id: "task-3", title: "Charge my phone", status: 'in progress'},
  { id: "task-4", title: "Cook dinner", status: 'in progress'},
]

const initialColumns = [
  {
    name: 'Task',
    id: '1',
    items: initialTasks
  },
  {
    name: 'Doing',
    id: '2',
    items: [] as ITask[]
  },
  {
    name: 'Completed',
    id: '3',
    items: [] as ITask[]
  },
]

function Home() {
  const [columns, setColumns] = useState<IColumns[]>(initialColumns);
  const [isNewTaskVisible, setIsNewTaskVisible] = useState(false);


  function handleOnDragEnd(result: DropResult) {
    const updatedColumns = draggableControl({result, originalColumns: columns});
    
    if(updatedColumns) setColumns(updatedColumns);
  }

  function createNewTask({title, description}: Omit<ITask, "id">) {
    const updatedColumns: IColumns[] = JSON.parse(JSON.stringify(columns));

    updatedColumns[0].items.push({
      id: '4',
      title,
      description,
      status: "completed"
    });

    setColumns(updatedColumns);
  }

  return (
    <Styled.Main>

      <Styled.Container>

        <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
          
          {columns.map((column) => (
            <Styled.Column key={column.id}>
              <Styled.Heading>{column.name}</Styled.Heading>

              <Droppable droppableId={column.id}>
                {(provided) => (

                  <div 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                  >
                    
                    <Styled.ColumnContent 
                      ref={provided.innerRef} 
                      {...provided.droppableProps}
                    >
                      
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
                    </Styled.ColumnContent>
                  </div>
                )}
              </Droppable>

              <Styled.BtnNewTask onClick={() => setIsNewTaskVisible(true)}>
                <Plus size={20} weight="bold" />
                Nova tarefa
              </Styled.BtnNewTask>               
            </Styled.Column>
          ))}
          
        </DragDropContext>

      </Styled.Container>

      <NewTaskModal 
        isVisible={isNewTaskVisible} 
        create={createNewTask} 
        closeModal={() => setIsNewTaskVisible(false)}
      />

    </Styled.Main>



  )
}

export default Home;


