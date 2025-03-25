import { Layout, Button, Row, Col, Table, Space } from 'antd';
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import LogWorkoutModal from './LogWorkoutModal';

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const data2 = [
  {
    notes: 'test#',
    date: new Date('2025-03-19 00:00:00').toLocaleDateString(),
    time: new Date('2025-03-19 00:00:00').toLocaleTimeString(),
    uid: '38vyDBBl84OrPamtTyNnlgd3HJQ2',
    workout: [
      {
        exerciseId: 'e_id10',
        exercise: 'Leg lifts',
        sets: [
          {
            weight: 1,
            reps: 1,
          },
        ],
      },
      {
        exerciseId: 'e_id4',
        exercise: 'Squats',
        sets: [
          {
            reps: 1,
            weight: 1,
          },
          {
            weight: 1,
            reps: 1,
          },
        ],
      },
    ],
    id: 'vMYirJtzEsOlmloLbyvQ',
  },
  {
    notes: 'test',
    workout: [
      {
        exerciseId: 'e_id11',
        sets: [
          {
            weight: 1,
            reps: 1,
          },
          {
            reps: 2,
            weight: 2,
          },
        ],
        exercise: 'Russian twist',
      },
      {
        exercise: 'Glute Bridge',
        sets: [
          {
            weight: 1,
            reps: 1,
          },
          {
            weight: 4,
            reps: 4,
          },
        ],
        exerciseId: 'e_id12',
      },
    ],
    uid: '38vyDBBl84OrPamtTyNnlgd3HJQ2',
    date: new Date('2025-03-21 00:00:00').toLocaleDateString(),
    time: new Date('2025-03-21 00:00:00').toLocaleTimeString(),
    id: 'vd3uXgTBbUIF8PZFJE0z',
  },
  {
    workout: [
      {
        exercise: 'Bird dog Exercise',
        sets: [
          {
            weight: 2,
            reps: 1,
          },
        ],
        exerciseId: 'e_id14',
      },
      {
        sets: [
          {
            weight: 2,
            reps: 1,
          },
        ],
        exercise: 'Russian twist',
        exerciseId: 'e_id11',
      },
    ],
    uid: '38vyDBBl84OrPamtTyNnlgd3HJQ2',
    notes: 'test 3',
    date: new Date('2025-03-21 00:00:00').toLocaleDateString(),
    time: new Date('2025-03-21 00:00:00').toLocaleTimeString(),
    id: 'vrzKBoEU4g70xDU8sB4z',
  },
  {
    date: new Date('2025-03-21 00:00:00').toLocaleDateString(),
    time: new Date('2025-03-21 00:00:00').toLocaleTimeString(),
    notes: 'test 2',
    workout: [
      {
        sets: [
          {
            weight: 1,
            reps: 1,
          },
          {
            weight: 2,
            reps: 1,
          },
        ],
        exercise: 'incline bench press',
        exerciseId: 'e_id1',
      },
      {
        exerciseId: 'e_id12',
        exercise: 'Glute Bridge',
        sets: [
          {
            weight: 2,
            reps: 2,
          },
          {
            weight: 1,
            reps: 1,
          },
        ],
      },
    ],
    uid: '38vyDBBl84OrPamtTyNnlgd3HJQ2',
    id: 'ypWzHDHJSSKLY2LuYLUG',
  },
];

const Logs = () => {
  const colRef = collection(db, 'Exercises');
  const colRef2 = collection(db, 'Logs');
  const [exerciseList, setExerciseList] = useState([]);
  const [loggedWorkoutList, setLoggedWorkoutList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [openTableModal, setOpenTableModal] = useState(false);

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

    getDocs(colRef2)
      .then((snapshot) => {
        setLoading(true);
        let loggedWorkouts = [];
        let updatedLoggedWorkout = [];

        snapshot.docs.forEach((doc) => {
          console.log({ ...doc.data() });
          loggedWorkouts.push({ ...doc.data(), id: doc.id });
        });

        updatedLoggedWorkout = loggedWorkouts.map((workout) => {
          console.log('w', loggedWorkouts);
          workout['time'] = new Date(workout.date).toLocaleTimeString();
          workout['date'] = new Date(workout.date).toLocaleDateString();
          return workout;
        });
        console.log('new', updatedLoggedWorkout);
        setLoggedWorkoutList(updatedLoggedWorkout);
        setLoading(false);
        console.log('loggedWorkoutList', loggedWorkoutList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  const showModal = () => {
    setOpen(true);
  };

  const showEditDataModal = (data) => {
    console.log('Edit data', data);
  };

  const deleteData = (data) => {
    setLoading(true);
    const docRef = doc(db, 'Logs', data.id);
    deleteDoc(docRef)
      .then(() => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <Layout style={{ minHeight: '100vh', padding: 10 }} align="center">
      {!loading && (
        <div>
          <Row justify="end">
            <Col span={4}>
              <Button style={{ margin: 10 }} onClick={showModal}>
                Log Workout
              </Button>
            </Col>
          </Row>
          <LogWorkoutModal
            open={open}
            loading={loading}
            setOpen={setOpen}
            exerciseList={exerciseList}
            colRef2={colRef2}
            setLoading={setLoading}
          ></LogWorkoutModal>

          <Table dataSource={loggedWorkoutList}>
            <ColumnGroup title="Time Stamp">
              <Column title="Date" dataIndex="date" key="date" />
              <Column title="Time" dataIndex="time" key="time" />
            </ColumnGroup>
            <Column title="Notes" dataIndex="notes" key="notes" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <a onClick={() => showEditDataModal(record)}>Edit </a>
                  <a onClick={() => deleteData(record)}>Delete</a>
                </Space>
              )}
            />
          </Table>
        </div>
      )}
    </Layout>
  );
};

export default Logs;
