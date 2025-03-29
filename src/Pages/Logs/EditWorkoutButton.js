import { useState } from 'react';
import EditWorkoutFormModel from './EditWorkoutFormModel';

const EditWorkoutButton = ({ exerciseList, workoutId, setFinishEdit }) => {
  const [openEdit, setOpenEdit] = useState(false);
  const showEditDataModal = () => {
    setOpenEdit(true);
  };
  return (
    <>
      <a onClick={() => showEditDataModal()}>Edit </a>
      <EditWorkoutFormModel
        exerciseList={exerciseList}
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        workoutId={workoutId}
        setFinishEdit={setFinishEdit}
      ></EditWorkoutFormModel>
    </>
  );
};

export default EditWorkoutButton;
