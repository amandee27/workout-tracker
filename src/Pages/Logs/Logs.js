import { DatePicker, Form, Input, InputNumber, Layout, Select, Button, Modal, Card, Row, Col } from 'antd';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase';

import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const Logs = () => {
  const [form] = Form.useForm();
  const uid = JSON.parse(localStorage.getItem('token-info')).uid;
  const colRef = collection(db, 'Exercises');
  const colRef2 = collection(db, 'Logs');
  const [exerciseList, setExerciseList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [open, setOpen] = useState(false);

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
  }, [loading]);

  const onFinish = (values, e) => {
    addDoc(colRef2, {
      uid: uid,
      date: values.date.format('YYYY-MM-DD HH:mm:ss'),
      notes: values.notes || '',
      workout: values.workout.map((work) => {
        return {
          exercise: work.selectExercise.label,
          exerciseId: work.selectExercise.value,
          sets: work.sets.map((set) => {
            return { reps: set.reps, weight: set.weight };
          }),
        };
      }),
    }).then(() => {
      form.resetFields();
      setOpen(false);
    });
  };

  const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setButtonDisabled(true);
    setOpen(false);
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
          <Modal
            open={open}
            okText="Submit"
            okButtonProps={{ autoFocus: true, htmlType: 'submit', disabled: buttonDisabled }} // {/* */}
            confirmLoading={loading}
            onCancel={handleCancel}
            destroyOnClose
            title="Log Workout"
            modalRender={(dom) => (
              <Form
                form={form}
                variant="outlined"
                className="add"
                style={{ maxWidth: 600 }}
                onFinish={(values) => onFinish(values)}
                clearOnDestroy
                initialValues={{ weight: 0, workouts: [{}] }}
                onFieldsChange={(chagedFeilds, allFeilds) => {
                  let val = allFeilds.map((feild) => {
                    return (
                      (feild.name.includes('date') && feild.errors.length > 0) ||
                      (feild.name.includes('selectExercise') && feild.errors.length > 0) ||
                      (feild.name.includes('sets') && feild.errors.length > 0) ||
                      (feild.name.includes('reps') && feild.errors.length > 0)
                    );
                  });

                  val.includes(true) ? setButtonDisabled(true) : setButtonDisabled(false);
                }}
              >
                {dom}
              </Form>
            )}
          >
            <Form.Item
              {...formItemLayout}
              label="Date"
              name="date"
              validateTrigger={['onBlur']}
              rules={[{ required: true, message: 'Please input date!' }]}
            >
              <DatePicker allowClear={false} showTime format="YYYY-MM-DD HH:mm:ss" style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item {...formItemLayout} label="Notes" name="notes">
              <Input.TextArea />
            </Form.Item>

            <Form.List name="workout">
              {(fields, { add, remove }) => (
                <div style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                  {fields.map((field) => (
                    <Card
                      size="small"
                      title={`Exercise ${field.name + 1}`}
                      key={field.key}
                      extra={
                        <CloseOutlined
                          onClick={() => {
                            remove(field.name);
                          }}
                        />
                      }
                    >
                      <Form.Item
                        {...formItemLayout}
                        label="Exercise"
                        name={[field.name, 'selectExercise']}
                        validateTrigger={['onBlur']}
                        rules={[{ required: true, message: 'Please input!' }]}
                      >
                        <Select labelInValue placeholder="Select a exercise" options={exerciseList} />
                      </Form.Item>

                      <Form.List name={[field.name, 'sets']}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.length > 0 && (
                              <Row align="middle" style={{ marginBottom: '16px' }}>
                                <Col offset={3} span={10} style={{ paddingRight: '16px' }}>
                                  Reps
                                </Col>
                                <Col span={10} style={{ paddingRight: '16px' }}>
                                  Weight
                                </Col>
                              </Row>
                            )}
                            {fields.map(({ key, name, ...restField }) => (
                              <div key={key}>
                                <Row align="middle" style={{ marginBottom: '12px' }}>
                                  <Col span={3}>{`Set ${key + 1}:`}</Col>
                                  <Col span={10} style={{ paddingRight: '16px' }}>
                                    <Form.Item
                                      {...restField}
                                      noStyle
                                      name={[name, 'reps']}
                                      validateTrigger={['onBlur']}
                                      rules={[{ required: true, message: 'Please input weight!' }]}
                                    >
                                      <InputNumber
                                        min={0}
                                        defaultValue={0}
                                        placeholder="reps"
                                        style={{ width: '100%' }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={10} style={{ paddingRight: '16px' }}>
                                    <Form.Item
                                      noStyle
                                      {...restField}
                                      name={[name, 'weight']}
                                      validateTrigger={['onBlur']}
                                      rules={[{ required: true, message: 'Please input weight!' }]}
                                    >
                                      <InputNumber
                                        min={0}
                                        defaultValue={0}
                                        placeholder="weight"
                                        style={{ width: '100%' }}
                                      />
                                    </Form.Item>
                                  </Col>
                                  <Col span={1}>
                                    <CloseOutlined onClick={() => remove(name)} />
                                  </Col>
                                </Row>
                              </div>
                            ))}
                            <Form.Item>
                              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                Add Set
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </Card>
                  ))}

                  <Button style={{ marginBottom: 10 }} type="dashed" onClick={() => add()} block>
                    + Add More Exercises
                  </Button>
                </div>
              )}
            </Form.List>
          </Modal>
        </div>
      )}
    </Layout>
  );
};

export default Logs;
