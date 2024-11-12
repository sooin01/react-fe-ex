import { Modal } from 'antd';

const Confirm = ({
  title = 'Save?',
  onOk,
  afterClose,
}: {
  title?: string;
  onOk: () => void;
  afterClose?: () => void;
}) => {
  const { confirm } = Modal;

  return confirm({
    title: title,
    okText: 'Yes',
    okType: 'primary',
    cancelText: 'No',
    onOk() {
      onOk();
    },
    onCancel() {},
    afterClose: () => {
      if (typeof afterClose === 'function') {
        afterClose();
      }
    },
  });
};

export default Confirm;
