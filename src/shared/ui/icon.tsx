import { FC, SVGProps } from 'react';
import styled, { RuleSet } from 'styled-components';

interface IconProps {
  Component: FC<SVGProps<SVGSVGElement>>;
  css?: RuleSet;
}

const IconWrapper = styled.span<{ $css?: RuleSet }>`
  display: inline-block;
  width: var(--icon-width);
  height: var(--icon-height);
  color: currentColor;

  svg {
    width: 100%;
    height: 100%;
  }

  ${(props) => props.$css}
`;

export const Icon: FC<IconProps> = ({ Component, css }) => {
  return (
    <IconWrapper $css={css}>
      <Component />
    </IconWrapper>
  );
};
