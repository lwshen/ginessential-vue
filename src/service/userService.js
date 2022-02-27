import request from '@/utils/request';

// 用户注册
const reqister = ({ name, telephone, password }) => {
  return request.post('auth/register', { name, telephone, password });
};

// 用户登录
const login = ({ telephone, password }) => {
  return request.post('auth/login', { telephone, password });
};

// 获取用户信息
const info = () => {
  return request.get('auth/info');
};

export default {
  reqister,
  login,
  info,
};
