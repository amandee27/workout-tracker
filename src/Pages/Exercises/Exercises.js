import { Card, Layout, List, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import CardLayout from './CardLayout/CardLayout';

const Exercises = () => {
  const [exercises, setExercises] = useState([]);
  const colRef = collection(db, 'Exercises');

  useEffect(() => {
    getDocs(colRef)
      .then((snapshot) => {
        let exercisesList = [];
        snapshot.docs.forEach((doc) => {
          exercisesList.push({ ...doc.data(), id: doc.id });
        });
        setExercises(exercisesList);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <Layout style={{ minHeightt: '100vh' }} align="center">
      <div style={{ padding: 10 }}>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 3,
            xl: 4,
            xxl: 3,
          }}
          dataSource={exercises}
          pagination={{
            showSizeChanger: false,
            pageSize: 12,
          }}
          renderItem={(item) => (
            <List.Item>
              <CardLayout exercise={item}></CardLayout>
            </List.Item>
          )}
        />
      </div>
    </Layout>
  );
};

export default Exercises;
