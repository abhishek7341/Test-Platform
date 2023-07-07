export interface ISaveContent {
  title: string;
  status: number;
}

export interface ISetContent {
  title: string;
  status: number;
}

export interface IContent {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: string;
}

export interface ITextEditorProps {
  id: string;
  name: string;
  value: string;
  helperText: string | undefined | boolean;
  error: boolean | undefined;
  onChange: (event: any) => void;
}
