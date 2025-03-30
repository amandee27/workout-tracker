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
    navigate(`/exercises/exercise-details/${id}`);
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
      onClick={() => exerciseDetails(exercise.id)}
      cover={<img alt="Card image" src={exercise.image} style={{ padding: 10 }} />}
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
    </Card>
  );
};

export default CardLayout;
