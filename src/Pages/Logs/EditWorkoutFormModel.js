import { useEffect, useState } from 'react';
import WorkoutFormModal from './WorkoutFormModal';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { Form } from 'antd';

const EditWorkoutFormModel = ({ exerciseList, openEdit, setOpenEdit, workoutId, setFinishEdit }) => {
  const [form] = Form.useForm();
  const [workout, setworkout] = useState(null); // fetched workout
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const uid = JSON.parse(localStorage.getItem('token-info')).uid;

  useEffect(() => {
    //Retriving data(doc) of selected logged workout to edit
    let updatedWorkout = {};
    if (workoutId && openEdit) {
      setFinishEdit(false);
      const docRef3 = doc(db, 'Logs', workoutId);
      getDoc(docRef3)
        .then((doc) => {
          updatedWorkout = {
            date: dayjs(doc.data().date), //reformat date to show data in date picker
            notes: doc.data().notes,
            workout: doc.data().workout,
            uid: doc.data().uid,
          };
          setworkout(updatedWorkout);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [openEdit]);

  const onFinish = (values, e) => {
    if (workoutId && openEdit) {
      const docRef = doc(db, 'Logs', workoutId);
      values.date = values.date.format('YYYY-MM-DD HH:mm:ss');
      values.notes = values.notes || '';
      values.uid = uid;

      updateDoc(docRef, values)
        .then(() => {
          setworkout(null);
          setLoading(false);
          setOpenEdit(false);
          setFinishEdit(true);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleCancel = () => {
    setButtonDisabled(true);
    setOpenEdit(false);
  };
  return workout != null ? (
    <WorkoutFormModal
      exerciseList={exerciseList}
      openEdit={openEdit}
      setOpenEdit={setOpenEdit}
      workout={workout}
      onFinish={onFinish}
      form={form}
      loading={loading}
      handleCancel={handleCancel}
      buttonDisabled={buttonDisabled}
      setButtonDisabled={setButtonDisabled}
    ></WorkoutFormModal>
  ) : null;
};

export default EditWorkoutFormModel;
