import { SvgIconTypeMap } from '@material-ui/core/SvgIcon';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

export type NavLinkProps = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  text: string;
  link: string;
};

export type NavButtonProps = {
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  text: string;
  onClick: () => void;
};
