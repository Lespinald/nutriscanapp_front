export function GetViewportWidth(): number{
  return document.documentElement.clientWidth;
}
export function GetViewportHeight(): number{
  return document.documentElement.clientHeight;
}
export function GetAspectRatio(): number{
  return document.documentElement.clientWidth/document.documentElement.clientHeight;
}
export function IsMobile(): boolean{
  return (GetViewportWidth() < 700 || GetAspectRatio() <= (3/4))
}
