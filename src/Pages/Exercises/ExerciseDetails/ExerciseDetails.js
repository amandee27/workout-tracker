import { Col, Layout, Row, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { CaretRightOutlined } from '@ant-design/icons';

const ExerciseDetails = () => {
  let { id } = useParams();
  const docRef = doc(db, 'Exercises', id);
  const [exercise, setExercise] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDoc(docRef)
      .then((doc) => {
        console.log(doc.data());
        setExercise(doc.data());
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [loading]);

  return (
    <Layout style={{ minHeight: '100vh' }} align="center">
      {!loading && (
        <div className="container" style={{ padding: 20, minHeight: '100vh' }}>
          <Row>
            <Col span={12}>
              <div style={{ backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <img alt="Card image" src={exercise.image} style={{ width: 400 }} />
              </div>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={24} justify="space-around">
                  <Typography.Title level={3}>{exercise.name.toUpperCase()}</Typography.Title>
                </Col>
              </Row>
              {exercise.type && (
                <Row style={{ marginTop: 10, marginBottom: 20, height: 20 }}>
                  <Col span={8} align="right" style={{ paddingRight: 10 }}>
                    <Row>
                      <Col span={20}>Type</Col>
                      <Col span={4}>:</Col>
                    </Row>
                  </Col>
                  <Col span={16} align="left">
                    {exercise.type}
                  </Col>
                </Row>
              )}
              {exercise.impact_area && (
                <Row style={{ marginTop: 10, marginBottom: 30, height: 20 }}>
                  <Col span={8} align="right" style={{ paddingRight: 10 }}>
                    <Row>
                      <Col span={20}> Impact body area</Col>
                      <Col span={4}>:</Col>
                    </Row>
                  </Col>
                  <Col span={16} align="left">
                    {exercise.impact_area}
                  </Col>
                </Row>
              )}
              {exercise.muscles && (
                <Row style={{ marginTop: 10, marginBottom: 20, height: 40 }}>
                  <Col span={8} align="right" style={{ paddingRight: 10 }}>
                    <Row>
                      <Col span={20}> muscles</Col>
                      <Col span={4}>:</Col>
                    </Row>
                  </Col>
                  <Col span={16} align="left">
                    {exercise.muscles}
                  </Col>
                </Row>
              )}
              {exercise.equipment && (
                <Row style={{ marginTop: 10, marginBottom: 20, height: 30 }}>
                  <Col span={8} align="right" style={{ paddingRight: 10 }}>
                    <Row>
                      <Col span={20}> Equipment</Col>
                      <Col span={4}>:</Col>
                    </Row>
                  </Col>
                  <Col span={16} align="left">
                    {exercise.equipment}
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          {exercise.instructions && (
            <Row>
              <Col span={24} align="left" style={{ marginTop: 30, marginBottom: 10 }}>
                Instructions
              </Col>
            </Row>
          )}
          <Row>
            <Col span={24} align="left">
              {exercise.instructions &&
                exercise.instructions.map((instruct) => (
                  <Col span={24} style={{ paddingTop: 10, paddingBottom: 10 }}>
                    <CaretRightOutlined /> {instruct}
                  </Col>
                ))}
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default ExerciseDetails;
