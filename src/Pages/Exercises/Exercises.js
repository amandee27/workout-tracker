import { Layout } from 'antd';
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
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'auto auto auto ',
          gridGap: 10,
          padding: 10,
        }}
      >
        {exercises.map((exerc) => (
          <div style={{ padding: 10 }}>
            <CardLayout exercise={exerc}></CardLayout>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Exercises;
