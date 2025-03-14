import { Col, Layout, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';

const ExerciseDetails = () => {
  let { id } = useParams();
  const docRef = doc(db, 'Exercises', id);
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        setExercise(doc.data());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  return (
    <Layout style={{ minHeight: '100vh' }} align="center">
      <div className="container" style={{ padding: 10 }}>
        {!loading && (
          <Row>
            <Col span={12}>
              <Typography.Title>{exercise.name.toUpperCase()}</Typography.Title>
              <div style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh', width: 300 }}>
                <img alt="Card image" src={exercise.image} />
              </div>
            </Col>
            <Col span={12}></Col>
          </Row>
        )}
      </div>
    </Layout>
  );
};

export default ExerciseDetails;
