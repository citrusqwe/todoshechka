import { ChangeEvent, FC } from 'react';
import styled, { RuleSet } from 'styled-components';

interface CheckboxProps {
  label?: string;
  css?: RuleSet;
  checked?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxContainer = styled.div<{ $css?: RuleSet }>`
  display: flex;
  align-items: center;
  cursor: pointer;
  ${(props) => props.$css}
`;

const CheckboxItem = styled.input.attrs({ type: 'checkbox' })`
  -webkit-appearance: none;
  appearance: none;
  display: inline-block;
  cursor: pointer;
  width: 24px;
  height: 24px;
  background: var(--primary-color-muted);
  border-radius: 8px;
  border: 2px solid var(--accent-color);
  transition: 0.3s ease;
  position: relative;

  &:checked {
    background: var(--accent-color);

    &::before {
      content: '✔';
      font-size: 14px;
      color: var(--text-color);
      position: absolute;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;

const CheckboxLabel = styled.label`
  margin-left: 8px;
`;

export const Checkbox: FC<CheckboxProps> = ({ css, label, checked = false, onChange }) => (
  <CheckboxContainer $css={css}>
    <CheckboxItem checked={checked} onChange={onChange} />
    <CheckboxLabel>{label}</CheckboxLabel>
  </CheckboxContainer>
);
