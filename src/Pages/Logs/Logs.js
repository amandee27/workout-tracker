import { Layout, Button, Row, Col, Table, Space, Popconfirm, Empty } from 'antd';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import ColumnGroup from 'antd/es/table/ColumnGroup';
import Column from 'antd/es/table/Column';
import LogWorkoutFormModel from './LogWorkoutFormModel';
import EditWorkoutButton from './EditWorkoutButton';

const Logs = () => {
  const colRef = collection(db, 'Exercises');
  const colRef2 = collection(db, 'Logs');
  const [loggedWorkoutList, setLoggedWorkoutList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCreate, setOpenCreate] = useState(false);
  const [finishEdit, setFinishEdit] = useState(false);
  const [exerciseList, setExerciseList] = useState([]);

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
          loggedWorkouts.push({ ...doc.data(), id: doc.id });
        });
        updatedLoggedWorkout = loggedWorkouts.map((workout) => {
          workout['time'] = new Date(workout.date).toLocaleTimeString();
          workout['dateTime'] = workout.date;
          workout['workoutDate'] = new Date(workout.date).toLocaleDateString();
          workout['workout'] = workout.workout;
          workout['id'] = workout.id;
          workout['uid'] = workout.uid;
          return workout;
        });
        setLoggedWorkoutList(updatedLoggedWorkout);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading, openCreate, finishEdit]);

  const LogWorkout = () => {
    setOpenCreate(true);
  };

  const confirm = (e) => {
    deleteData(e);
  };

  const cancel = (e) => {};

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

  const toggleButton = (
    <div>
      <p>
        Looks like you haven't logged any workouts yet,
        <br /> Click on button to add first one.
      </p>
      <Button type="primary" onClick={LogWorkout}>
        Log Workout
      </Button>
    </div>
  );

  return (
    <Layout style={{ minHeight: '100vh', padding: 10 }} align="center">
      {!loading && (
        <div>
          <Row justify="end">
            <Col span={4}>
              <Button type="primary" style={{ margin: 10 }} onClick={LogWorkout}>
                Log Workout
              </Button>
            </Col>
          </Row>

          <LogWorkoutFormModel
            exerciseList={exerciseList}
            openCreate={openCreate}
            setOpenCreate={setOpenCreate}
          ></LogWorkoutFormModel>

          <Table
            dataSource={loggedWorkoutList}
            locale={{ emptyText: <Empty description="No Logged Workouts">{toggleButton}</Empty> }}
          >
            <Column title="Date" dataIndex="workoutDate" key="workoutDate" />
            <Column title="Time" dataIndex="time" key="time" />

            <Column title="Notes" dataIndex="notes" key="notes" />
            <Column
              title="Action"
              key="action"
              render={(_, record) => (
                <Space size="middle">
                  <EditWorkoutButton
                    workoutId={record.id}
                    exerciseList={exerciseList}
                    setFinishEdit={setFinishEdit}
                  ></EditWorkoutButton>
                  <Popconfirm
                    title="Delete the workout"
                    description="Are you sure to delete this workout?"
                    onConfirm={() => confirm(record)}
                    onCancel={cancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a>Delete</a>
                  </Popconfirm>
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
