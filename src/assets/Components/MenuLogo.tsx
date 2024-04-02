import { CSSProperties } from "react";

const MenuLogo = ({className, style}: {className?: string, style?: CSSProperties}) => {
  return (
    <svg className={className} style={style} width="50" height="37" viewBox="0 0 50 37" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="3.5" y1="3.5" x2="46.5" y2="3.5" strokeWidth="7" strokeLinecap="round"/>
      <line x1="3.5" y1="18.5" x2="46.5" y2="18.5" strokeWidth="7" strokeLinecap="round"/>
      <line x1="3.5" y1="33.5" x2="46.5" y2="33.5" strokeWidth="7" strokeLinecap="round"/>
    </svg>
  );
}

export default MenuLogo;
