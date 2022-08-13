import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { postSignin, postSignup } from '../../axios/auth';
import Font from '../../components/font';

const EMAIL_REGEX = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
const PASSWORD_REGEX = /^[A-Za-z0-9]{8,20}$/;

const Auth = () => {
  const navigate = useNavigate();

  // signin
  const [signinEmail, setSigninEmail] = useState('');
  const [signinPassWord, setSigninPassWord] = useState('');

  // signup
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassWord, setSignupPassWord] = useState('');

  // confirm
  const [signinConfirmRegex, setSigninConfirmRegex] = useState(false);
  const [signupConfirmRegex, setSignupConfirmRegex] = useState(false);

  const submitSignup = async (props) => {
    try {
      await postSignup(props).then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        alert('회원가입 완료');
        navigate('/todo');
      });
    } catch (e) {
      console.log(e);
    }
  };

  const submitSignin = async (props) => {
    try {
      await postSignin(props).then((res) => {
        localStorage.setItem('access_token', res.data.access_token);
        navigate('/todo');
      });
    } catch (e) {
      console.log(e);
    }
  };

  // 리다이렉트
  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      navigate('/todo');
    }
  }, []);

  // 유효성 검사
  useEffect(() => {
    if (EMAIL_REGEX.test(signinEmail) && PASSWORD_REGEX.test(signinPassWord)) {
      setSigninConfirmRegex(true);
    } else {
      setSigninConfirmRegex(false);
    }

    if (EMAIL_REGEX.test(signupEmail) && PASSWORD_REGEX.test(signupPassWord)) {
      setSignupConfirmRegex(true);
    } else {
      setSignupConfirmRegex(false);
    }
  }, [signinEmail, signinPassWord, signupEmail, signupPassWord]);

  return (
    <Frame>
      <Wrapper>
        <Font size={21}>회원가입</Font>

        <InputWrapper>
          <Font size={14}>이메일</Font>
          <CustomInput
            type="email"
            value={signupEmail}
            onChange={(e) => {
              setSignupEmail(e.target.value);
            }}
          />
        </InputWrapper>

        <InputWrapper>
          <Font size={14}>비밀번호</Font>
          <CustomInput
            type="password"
            value={signupPassWord}
            onChange={(e) => {
              setSignupPassWord(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitSignup({ email: signupEmail, password: signupPassWord });
              }
            }}
          />
        </InputWrapper>

        <Button
          type="button"
          disabled={!signupConfirmRegex}
          onClick={(e) => submitSignup({ email: signupEmail, password: signupPassWord })}
        >
          회원가입
        </Button>
      </Wrapper>

      <Wrapper margin="100px 0 0 0">
        <Font size={21}>로그인</Font>

        <InputWrapper>
          <Font size={14}>이메일</Font>
          <CustomInput
            type="email"
            value={signinEmail}
            onChange={(e) => {
              setSigninEmail(e.target.value);
            }}
          />
        </InputWrapper>

        <InputWrapper>
          <Font size={14}>비밀번호</Font>
          <CustomInput
            type="password"
            value={signinPassWord}
            onChange={(e) => {
              setSigninPassWord(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submitSignin({ email: signinEmail, password: signinPassWord });
              }
            }}
          />
        </InputWrapper>

        <Button
          type="button"
          disabled={!signinConfirmRegex}
          onClick={() => submitSignin({ email: signinEmail, password: signinPassWord })}
        >
          로그인
        </Button>
      </Wrapper>
    </Frame>
  );
};

export default Auth;

// frame
const Frame = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// warpper
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: ${(props) => (props.margin ? props.margin : '0 0 0 0')};
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: 20px;
`;

// component

const CustomInput = styled.input`
  border: 1px solid #000;
`;

const Button = styled.button`
  width: 80px;
  height: 40px;
  border-radius: 20px;
  margin-top: 20px;
  color: #fff;
  background-color: #0004e3;
  cursor: pointer;

  &:disabled {
    opacity: 0.2;
    cursor: default;
  }
`;
