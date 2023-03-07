import { Plus, X } from "@phosphor-icons/react";
import { FormEvent, useState } from "react";
import { ITask } from "../../interfaces/ITodo";
import * as Styled from "./styles";

type Props = {
  isVisible: boolean;
  create: ({title, description, status}: Omit<ITask, "id">) => void;
  closeModal: () => void;
}

export function NewTaskModal({isVisible, create, closeModal}: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('');

  function handleCloseModal() {
    resetFields();
    closeModal();
  }

  function resetFields() {
    setTitle('');
    setDescription('');
    setColor('');
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    create({
      title,
      description,
      status: "to-do"
    });

    handleCloseModal();
  }

  return (
    <Styled.Container visible={isVisible} onSubmit={handleSubmit}>

      <Styled.CloseModal type="button" onClick={handleCloseModal}>
        <X size={24} weight="bold" />
      </Styled.CloseModal>

      <h2>Cadastre sua nova task</h2>
        
      <div className="content">
        <Styled.InputContainer>
          Título
          <input 
            type="text" 
            placeholder="Título" 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
          />
        </Styled.InputContainer>
          
        <Styled.InputContainer>
          Descrição *
          <input 
            type="text" 
            placeholder="Descrição" 
            value={description}
            onChange={(e) => setDescription(e.target.value)} />
        </Styled.InputContainer>

        <Styled.InputContainer>
          Cor de destaque
          <input type="color" />
        </Styled.InputContainer>
      </div>

      <Styled.Button type="submit">Cadastrar</Styled.Button>
    </Styled.Container>
  )
}