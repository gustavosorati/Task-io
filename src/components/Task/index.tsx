import { DotsThreeVertical } from "@phosphor-icons/react";
import { DraggableProvided, DraggableStateSnapshot } from "react-beautiful-dnd"
import { ITask } from "../../interfaces/ITodo"
import { Container, Content, Heading, Status, Text } from "./styles";

type Props = {
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
  task: ITask;
} 

export function Task({provided, snapshot, task}: Props) {

  function handleOnClick() {
    console.log('clicou');
    console.log(provided);
  }

  return (
    <Container 
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps} 
      isDragging={snapshot.isDragging}
      draggingStyles={provided.draggableProps}     
      onClick={handleOnClick}
    > 
      <Status type={"completed"} />
      
      <Content>
        <div className="header">
          <Heading>{task.title}</Heading>

          <button>
            <DotsThreeVertical size={18} weight="bold" />
          </button>
        </div>

        {task.description ? <Text>{task.description}</Text> : <Text />}
      </Content>
    </Container>
  )
}