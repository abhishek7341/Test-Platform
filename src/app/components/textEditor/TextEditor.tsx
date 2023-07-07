import React, { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Typography } from "@mui/material";
import { useFormik } from "formik";

interface ITextEditorProps {
  id: string;
  name: string;
  value: string;
  onChange: (event: any) => void;
}

const TextEditor: React.FC<ITextEditorProps> = (textEditorProps) => {
  const handleTextEditorChange = (data: string) => {
    textEditorProps.onChange(data);
  };

  return (
    <Typography component="div" sx={{ mb: 4 }}>
      <Editor
        initialValue={textEditorProps.value}
        init={{
          plugins: "link image code",
          toolbar:
            "undo redo | bold italic | alignleft aligncenter alignright | code",
        }}
        onEditorChange={handleTextEditorChange}
      />
    </Typography>
  );
};

export default TextEditor;
