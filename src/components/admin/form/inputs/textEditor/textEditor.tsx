"use client"

import { CKEditor } from "@ckeditor/ckeditor5-react";
import Editor from "ckeditor5-custom-build";

import "./textEditorStyles.css";

interface EditorProps {
    content: string;
    onChange: (data: string) => void;
};

const TextEditor: React.FC<EditorProps> = ({ content, onChange }) => {

    return (
        <div className="ckeditor-custom">
            <CKEditor
                editor={Editor}
                data={content}
                onChange={(_event, editor) => {
                    const data = editor.getData();
                    onChange(data);
                }}
                config={{
                    simpleUpload: {
                        uploadUrl: "/api/upload/editor",
                    }
                }}
            />
        </div>
    );
};

export default TextEditor;
