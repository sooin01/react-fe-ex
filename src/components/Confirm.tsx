import { Modal } from 'antd';

const Confirm = ({ onOk }: { onOk: () => void }) => {
  const { confirm } = Modal;

  return confirm({
    title: 'Save?',
    okText: 'Yes',
    okType: 'primary',
    cancelText: 'No',
    onOk() {
      onOk();
    },
    onCancel() {},
  });
};

export default Confirm;
