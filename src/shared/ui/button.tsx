import { FC, HTMLProps, ReactNode } from 'react';
import styled, { css, RuleSet } from 'styled-components';

type ButtonVariants = 'outline' | 'ghost' | 'icon';
type ButtonTheme = 'default' | 'accent';

interface InputProps extends HTMLProps<HTMLButtonElement> {
  children?: ReactNode;
  disabled?: boolean;
  css?: RuleSet;
  type?: 'button' | 'submit';
  variant?: ButtonVariants;
  theme?: ButtonTheme;
}

const StyledButton = styled.button<{ $css?: RuleSet; $variant: ButtonVariants; $theme: ButtonTheme }>`
  transition: 0.3s ease-in-out;
  border-radius: var(--border-radius);
  padding: var(--gap-sm);
  cursor: pointer;
  color: var(--text-color);

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
    cursor: unset;
  }

  ${(props) => {
    switch (props.$variant) {
      case 'ghost':
        return css`
          border: none;
          background: transparent;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        `;
      case 'icon':
        return css`
          padding: var(--gap-xs);
          width: var(--icon-btn);
          height: var(--icon-btn);
          border: none;
          background: transparent;
          &:hover {
            background: rgba(0, 0, 0, 0.1);
          }
        `;
      case 'outline':
        return css`
          border: 2px solid var(--border-color);
          background: transparent;
          &:hover {
            background: ${props.$theme === 'accent' ? 'var(--accent-color)' : 'var(--primary-color)'};
          }
        `;
      default:
        return css``;
    }
  }}

  ${(props) => props.$css}
`;

export const Button: FC<InputProps> = ({
  children,
  css,
  type,
  variant = 'outline',
  disabled,
  theme = 'default',
  ...props
}) => {
  return (
    <StyledButton $css={css} $variant={variant} $theme={theme} type={type} disabled={disabled} {...props}>
      {children}
    </StyledButton>
  );
};
