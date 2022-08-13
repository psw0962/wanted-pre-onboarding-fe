import clientAxios from '.';

export const postSignup = (data) => {
  return clientAxios({
    method: 'POST',
    url: `auth/signup`,
    data,
  });
};

export const postSignin = (data) => {
  return clientAxios({
    method: 'POST',
    url: 'auth/signin',
    data,
  });
};
