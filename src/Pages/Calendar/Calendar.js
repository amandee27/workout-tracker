import { Calendar, Layout, Skeleton } from 'antd';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

const CalendarPage = () => {
  const [loggedWorkouts, setLoggedWorkouts] = useState(null);
  const [exerciseList, setExerciseList] = useState(null);
  const [keyValueMap, setKeyValueMap] = useState({});
  const colRef = collection(db, 'Logs');
  const colRef2 = collection(db, 'Exercises');

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let loggedWorkoutList = [];
        snapshot.docs.forEach((doc) => {
          loggedWorkoutList.push({ ...doc.data(), id: doc.id });
        });
        setLoggedWorkouts(loggedWorkoutList);
      })
      .catch((err) => {
        console.log(err.message);
      });

    getDocs(colRef2)
      .then((snapshot) => {
        let exercises = [];
        let keyMap = {};
        snapshot.docs.forEach((doc) => {
          exercises.push({ ...doc.data(), id: doc.id });
        });
        setExerciseList(exercises);
        keyMap = exercises.reduce((mapAccumulator, obj) => {
          mapAccumulator[obj.id] = obj.name;
          return mapAccumulator;
        }, {});
        setKeyValueMap(keyMap);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const getListData = (value) => {
    let listData = [];
    if (
      loggedWorkouts !== null &&
      exerciseList !== null &&
      loggedWorkouts.length > 0 &&
      exerciseList.length > 0 &&
      Object.keys(keyValueMap).length > 0
    ) {
      loggedWorkouts.forEach((workout) => {
        if (value.isSame(dayjs(workout?.date), 'day')) {
          workout.workout.map((exercise) => {
            if (keyValueMap[exercise.selectedExercise]) {
              listData.push({ display: true, type: 'warning', content: keyValueMap[exercise.selectedExercise] });
            }
          });
        }
      });
    }

    return listData || [];
  };

  const dateCellRender = (value) => {
    let listData = [];
    if (
      loggedWorkouts !== null &&
      exerciseList !== null &&
      loggedWorkouts.length !== 0 &&
      exerciseList.length !== null &&
      Object.keys(keyValueMap).length > 0
    ) {
      listData = getListData(value);
    }

    if (loggedWorkouts === null && exerciseList === null) {
      return <Skeleton.Input active={true} size="small" />;
    } else
      return (
        <ul className="events" style={{ listStyleType: 'none', color: 'red' }}>
          {!(listData.length === 1 && listData[0].length === 0) &&
            listData.map((item) => (
              <li key={item.content}>{item.content && <p style={{ fontSize: 12 }}>{item.content}</p>}</li>
            ))}
        </ul>
      );
  };
  const cellRender = (current, info) => {
    if (info.type === 'date') return dateCellRender(current);
    return info.originNode;
  };
  return (
    <Layout style={{ minHeightt: '100vh' }} align="center">
      <div style={{ padding: 30 }}>
        <Calendar cellRender={cellRender} />
      </div>
    </Layout>
  );
};

export default CalendarPage;
