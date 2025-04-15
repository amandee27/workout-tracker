import { Form, Modal } from 'antd';
import 'dayjs/locale/zh-cn';
import WorkoutForm from './WorkoutForm';

const WorkoutFormModal = ({
  openEdit,
  openCreate,
  exerciseList,
  workout,
  onFinish,
  form,
  handleCancel,
  buttonDisabled,
  setButtonDisabled,
}) => {
  return (
    <Modal
      open={openEdit || openCreate}
      okText="Submit"
      okButtonProps={{ autoFocus: true, htmlType: 'submit', disabled: buttonDisabled }}
      // confirmLoading={loading}
      onCancel={handleCancel}
      destroyOnClose
      title={openEdit ? 'Edit Workout' : 'Log Workout'}
      modalRender={(dom) => (
        <Form
          form={form}
          variant="outlined"
          className="add"
          style={{ maxWidth: 600 }}
          onFinish={(values) => onFinish(values)}
          clearOnDestroy
          initialValues={workout}
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
      <WorkoutForm exerciseList={exerciseList}></WorkoutForm>
    </Modal>
  );
};

export default WorkoutFormModal;
