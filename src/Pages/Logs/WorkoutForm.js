import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, Row, Select } from 'antd';

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

const WorkoutForm = ({ exerciseList }) => {
  return (
    <>
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
                  name={[field.name, 'selectedExercise']}
                  validateTrigger={['onBlur']}
                  rules={[{ required: true, message: 'Please input!' }]}
                >
                  <Select placeholder="Select a exercise" options={exerciseList} />
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
                                  /*defaultValue={0}*/ placeholder="reps"
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
                                  /*defaultValue={0}*/ placeholder="weight"
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
    </>
  );
};

export default WorkoutForm;
