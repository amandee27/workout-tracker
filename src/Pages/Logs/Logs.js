import { DatePicker, Form, Input, InputNumber, Layout, Select, Button, Typography } from 'antd';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Logs = () => {
  const [form] = Form.useForm();
  const colRef = collection(db, 'Exercises');
  const colRef2 = collection(db, 'Users', '38vyDBBl84OrPamtTyNnlgd3HJQ2', 'Logs');

  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let exercisesList = [];
        let workoutList = [];
        snapshot.docs.forEach((doc) => {
          exercisesList.push({ ...doc.data(), id: doc.id });
        });

        workoutList = exercisesList.map((exercise) => {
          return { value: exercise.id, label: exercise.name };
        });
        setExerciseList(workoutList);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  const onFinish = (values, e) => {
    addDoc(colRef2, {
      date: values.date.format('YYYY-MM-DD HH:mm:ss'),
      notes: values.notes,
      reps: values.reps,
      w_id: values.selectWorkout.key,
      weight: values.weight,
      workout: values.selectWorkout.label,
    }).then(() => {
      form.resetFields();
    });
  };

  return (
    <Layout style={{ minHeight: '100vh' }} align="center">
      {!loading && (
        <div>
          <Typography.Title>Log Workout</Typography.Title>
          <Form
            {...formItemLayout}
            form={form}
            variant="outlined"
            className="add"
            style={{ maxWidth: 600 }}
            onFinish={onFinish}
            onFieldsChange={(chagedFeilds, allFeilds) => {
              let allValidated =
                allFeilds.find((item) => item.name[0] === 'sets').validated &&
                allFeilds.find((item) => item.name[0] === 'reps').validated &&
                allFeilds.find((item) => item.name[0] === 'date').validated &&
                allFeilds.find((item) => item.name[0] === 'selectWorkout').validated;
              let setsValidation = Boolean(allFeilds.find((item) => item.name[0] === 'sets').errors.length);
              let repsValidation = Boolean(allFeilds.find((item) => item.name[0] === 'reps').errors.length);
              let dateValidation = Boolean(allFeilds.find((item) => item.name[0] === 'date').errors.length);
              let selectWorkoutValidation = Boolean(
                allFeilds.find((item) => item.name[0] === 'selectWorkout').errors.length
              );
              let hasFeildError = selectWorkoutValidation || setsValidation || repsValidation || dateValidation;
              let formDisabled = allValidated && !hasFeildError;
              setButtonDisabled(!formDisabled);
            }}
          >
            <Form.Item
              label="Workout"
              name="selectWorkout"
              validateTrigger={['onBlur']}
              rules={[{ required: true, message: 'Please input!' }]}
            >
              <Select labelInValue placeholder="Select a workout" options={exerciseList} />
            </Form.Item>

            <Form.Item
              label="Sets"
              name="sets"
              validateTrigger={['onBlur']}
              rules={[{ required: true, message: 'Please input no. of sets!' }]}
            >
              <InputNumber style={{ width: '100%' }} min="0" />
            </Form.Item>

            <Form.Item
              label="Reps"
              name="reps"
              validateTrigger={['onBlur']}
              rules={[{ required: true, message: 'Please input reps!' }]}
            >
              <InputNumber style={{ width: '100%' }} min="0" />
            </Form.Item>

            <Form.Item label="Weight" name="weight">
              <InputNumber style={{ width: '100%' }} min="0" />
            </Form.Item>

            <Form.Item label="Notes" name="notes">
              <Input.TextArea />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              validateTrigger={['onBlur']}
              rules={[{ required: true, message: 'Please input date!' }]}
            >
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit" disabled={buttonDisabled}>
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </Layout>
  );
};

export default Logs;
