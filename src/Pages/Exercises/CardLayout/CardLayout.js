import { Card, Divider, Flex, theme, Tooltip } from 'antd';
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import Typography from 'antd/es/typography/Typography';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { useToken } = theme;

const CardLayout = ({ exercise }) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { token } = useToken();

  const styles = {
    card: {
      width: '300px',
    },
    paragraph: {
      color: token.colorTextSecondary,
      fontSize: 14,
    },
  };

  const logWorkout = () => {
    console.log('Log workout');
  };

  const exerciseDetails = (id) => {
    navigate(`/exercise-details/${id}`);
  };
  useEffect(() => {
    if (!exercise) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [exercise]);

  return (
    <Card loading={loading} key={exercise.id} style={{ width: 350 }}>
      <Flex vertical gap="middle" style={{ height: 500 }}>
        <Flex vertical style={{ backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
          <img alt="Card image" src={exercise.image} />
        </Flex>
        <Flex vertical gap={token.marginXXS}>
          <Typography.Title level={4} align="center" style={{ marginBottom: -5 }}>
            {exercise.name.toUpperCase()}
          </Typography.Title>

          <Typography.Text align="center" type="secondary" style={styles.paragraph} strong>
            <b>Type : </b>
            {exercise.type}
          </Typography.Text>
          <Typography.Text align="center" type="secondary" style={styles.paragraph}>
            <b>Impact area : </b>
            {exercise.impact_area}
          </Typography.Text>
        </Flex>
        <Divider />
        <Flex horizontal="true" justify="center" align="center">
          <Flex gap="large">
            <Tooltip placement="bottom" title="Log Exercise">
              <EditOutlined key="edit" onClick={logWorkout} />
            </Tooltip>
            <Divider type="vertical" />
            <Tooltip placement="bottom" title="Exercise details">
              <EllipsisOutlined key="ellipsis" onClick={() => exerciseDetails(exercise.id)} />
            </Tooltip>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CardLayout;
