import { Card, DatePicker, Form, Input, InputNumber, Modal, theme, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase';
import Meta from 'antd/es/card/Meta';

const { useToken } = theme;

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

const CardLayout = ({ exercise }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useToken();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();
  const colRef = collection(db, 'Exercises');
  const colRef2 = collection(db, 'Users', '38vyDBBl84OrPamtTyNnlgd3HJQ2', 'Logs');
  const [open, setOpen] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);
  const [loadingForm, setLoadingForm] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const styles = {
    card: {
      width: '300px',
    },
    paragraph: {
      color: token.colorTextSecondary,
      fontSize: 14,
    },
  };

  const showModal = () => {
    setOpen(true);
  };

  const exerciseDetails = (id) => {
    navigate(`/exercise-details/${id}`);
  };

  const onCreate = (values) => {
    addDoc(colRef2, {
      date: values.date.format('YYYY-MM-DD HH:mm:ss'),
      notes: values.notes || '',
      reps: values.reps,
      w_id: values.selectWorkout.key,
      weight: values.weight || 0,
      workout: values.selectWorkout.label,
    }).then(() => {
      form.resetFields();
    });
    setOpen(false);
  };

  const handleCancel = () => {
    setButtonDisabled(true);
    setOpen(false);
  };

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
  }, [loadingForm]);

  useEffect(() => {
    if (!exercise) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [exercise]);

  return (
    <Card
      hoverable
      loading={loading}
      key={exercise.id}
      style={{ height: 500 }}
      type="inner"
      cover={<img alt="Card image" src={exercise.image} style={{ padding: 10 }} />}
      actions={[
        <Tooltip placement="bottom" title="Log Exercise">
          <EditOutlined key="edit" onClick={showModal} />
        </Tooltip>,
        <Tooltip placement="bottom" title="Exercise details">
          <EllipsisOutlined key="ellipsis" onClick={() => exerciseDetails(exercise.id)} />
        </Tooltip>,
      ]}
    >
      <div style={{ height: '100%', width: '100%' }}>
        <Meta
          title={exercise.name.toUpperCase()}
          description={
            <>
              <b>Type : </b>
              {exercise.type}
              <br></br>
              <b>Impact area : </b>
              {exercise.impact_area}
            </>
          }
        />
      </div>

      <Modal
        open={open}
        okText="Submit"
        okButtonProps={{ autoFocus: true, htmlType: 'submit', disabled: buttonDisabled }}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        destroyOnClose
        title="Log Workout"
        modalRender={(dom) => (
          <Form
            {...formItemLayout}
            form={form}
            variant="outlined"
            className="add"
            style={{ maxWidth: 600 }}
            onFinish={(values) => onCreate(values)}
            clearOnDestroy
            initialValues={{ weight: 0 }}
            onFieldsChange={(chagedFeilds, allFeilds) => {
              let allValidated =
                allFeilds.find((item) => item.name[0] === 'sets').validated &&
                allFeilds.find((item) => item.name[0] === 'reps').validated &&
                allFeilds.find((item) => item.name[0] === 'date').validated;
              let setsValidation = Boolean(allFeilds.find((item) => item.name[0] === 'sets').errors.length);
              let repsValidation = Boolean(allFeilds.find((item) => item.name[0] === 'reps').errors.length);
              let dateValidation = Boolean(allFeilds.find((item) => item.name[0] === 'date').errors.length);
              let hasFeildError = setsValidation || repsValidation || dateValidation;
              let formDisabled = !(allValidated && !hasFeildError);
              setButtonDisabled(formDisabled);
            }}
          >
            {dom}
          </Form>
        )}
      >
        <Form.Item
          label="Workout"
          name="selectWorkout"
          validateTrigger={['onBlur']}
          rules={[{ message: 'Please input!' }]}
        >
          <Input defaultValue={exercise.name} readOnly />
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
      </Modal>
    </Card>
  );
};

export default CardLayout;
