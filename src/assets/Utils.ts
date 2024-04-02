export function GetViewportWidth(): number{
  return document.documentElement.clientWidth;
}
export function GetViewportHeight(): number{
  return document.documentElement.clientHeight;
}
export function GetAspectRatio(): number{
  return document.documentElement.clientWidth/document.documentElement.clientHeight;
}
export function IsMobile(mobileWidth: number = 760): boolean{
  return (GetViewportWidth() <= mobileWidth || GetAspectRatio() <= (5/8));
}
