import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'

type EditorType = {
    value: string,
    onChange: ( value:string ) => void
}
export  const Editor:React.FC<EditorType> = (props):JSX.Element => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
      ],
      ['link', 'image'],
      ['clean'],
    ],
  };
  return (
    <div className="content">
    <ReactQuill
      value={props.value}
      theme={'snow'}
      onChange={props.onChange}
      modules={modules} />
    </div>
  );
}