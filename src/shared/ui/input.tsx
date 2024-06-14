import { FC, HTMLProps } from 'react';
import styled, { RuleSet } from 'styled-components';

interface InputProps extends HTMLProps<HTMLInputElement> {
  css?: RuleSet;
  type?: 'text' | 'password' | 'email';
}

const StyledInput = styled.input<{ $css?: RuleSet }>`
  width: 100%;
  padding: var(--gap-md);
  border-radius: var(--border-radius);
  font-size: var(--font-size-md);
  line-height: var(--line-height-md);
  border: 2px solid var(--border-color);
  color: var(--text-color);
  outline: none;
  &:focus {
    border-color: var(--primary-color);
  }
  &::placeholder {
    font-family: var(--font-family);
    color: var(--text-color-muted);
    font-weight: 500;
  }

  ${(props) => props.$css}
`;

export const Input: FC<InputProps> = ({ css, type, ...props }) => {
  return <StyledInput $css={css} type={type} {...props} />;
};
