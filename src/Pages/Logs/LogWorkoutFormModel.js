import { addDoc, collection } from 'firebase/firestore';
import WorkoutFormModal from './WorkoutFormModal';
import { db } from '../../firebase';
import { useState } from 'react';
import { Form } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const LogWorkoutFormModel = ({ exerciseList, openCreate, setOpenCreate }) => {
  const uid = JSON.parse(localStorage.getItem('token-info')).uid;
  const colRef2 = collection(db, 'Logs');
  const [loading, setLoading] = useState(true);
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const workout = { date: dayjs() };

  const onFinish = (values, e) => {
    values.date = values.date.format('YYYY-MM-DD HH:mm:ss');
    values.uid = uid;
    values.notes = values.notes || '';

    addDoc(colRef2, values).then(() => {
      form.resetFields();
      setLoading(false);
      setOpenCreate(false);
    });
  };

  const handleCancel = () => {
    setButtonDisabled(true);
    setOpenCreate(false);
  };
  return (
    <>
      <WorkoutFormModal
        exerciseList={exerciseList}
        openCreate={openCreate}
        setOpenCreate={setOpenCreate}
        onFinish={onFinish}
        form={form}
        loading={loading}
        handleCancel={handleCancel}
        buttonDisabled={buttonDisabled}
        setButtonDisabled={setButtonDisabled}
        workout={workout}
      ></WorkoutFormModal>
    </>
  );
};

export default LogWorkoutFormModel;
