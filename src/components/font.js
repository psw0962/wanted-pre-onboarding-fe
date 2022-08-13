import styled, { css } from 'styled-components';

const Font = styled.p`
  display: ${(props) => (props.useSpan ? '' : 'flex')};
  align-items: ${(props) => (props.useSpan ? '' : 'center')};

  // 기본 속성
  color: ${(props) => (props.color ? props.theme.colors[props.color] : '#000')};
  letter-spacing: ${(props) => (props.letterSpacing ? props.letterSpacing : '-0.02em')};
  line-height: ${(props) => (props.lineHeight ? props.lineHeight : '1.4')};
  padding-top: ${(props) => (props.paddingTop ? `${props.paddingTop}px` : '')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : 400)};
  text-decoration: ${(props) => (props.textDecoration ? props.textDecoration : '')};
  text-align: ${(props) => (props.textAlign ? props.textAlign : '')};
  margin: ${({ margin }) => margin};
  cursor: ${(props) => (props.pointer ? 'pointer' : '')};

  ${(props) => {
    switch (props.size) {
      case 32:
        return css`
          font-size: 32px;
        `;

      case 24:
        return css`
          font-size: 24px;
        `;

      case 21:
        return css`
          font-size: 21px;
        `;

      case 18:
        return css`
          font-size: 18px;
        `;

      case 16:
        return css`
          font-size: 16px;
        `;

      case 15:
        return css`
          font-size: 15px;
        `;

      case 14:
        return css`
          font-size: 14px;
        `;

      case 13:
        return css`
          font-size: 13px;
        `;

      case 12:
        return css`
          font-size: 12px;
        `;

      case 11:
        return css`
          font-size: 11px;
        `;

      case 10:
        return css`
          font-size: 10px;
        `;
    }
  }};
`;

export default (props) => {
  return (
    <Font {...props} className={props.className}>
      {props.children}
    </Font>
  );
};
