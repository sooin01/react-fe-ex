import { Modal } from 'antd';

type ConfirmType = {
  title?: string;
  onOk: () => void;
  afterClose?: () => void;
};

const Confirm = ({ title = 'Confirm?', onOk, afterClose }: ConfirmType) => {
  const { confirm } = Modal;

  return confirm({
    title: title,
    okText: 'Yes',
    okType: 'primary',
    cancelText: 'No',
    onOk,
    onCancel() {},
    afterClose,
  });
};

export default Confirm;
