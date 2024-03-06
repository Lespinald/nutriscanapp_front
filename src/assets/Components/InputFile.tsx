interface Props{
  name: string;
  accept: string;
  styleClass?: string;
  children?: React.ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputFile = ({name, accept, styleClass, children, onChange}: Props) => {
  return(
    <>
      <label htmlFor={name} className={styleClass}>
        {children}
        <input id={name} type="file" accept={accept} capture hidden onChange={onChange}/>
      </label>
    </>
  );
}

export  default InputFile;
