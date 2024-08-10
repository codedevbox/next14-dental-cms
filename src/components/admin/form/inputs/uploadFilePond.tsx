import { useState } from "react";
import { useTranslations } from "next-intl";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginFileValidateSize, FilePondPluginFileValidateType);

interface UploadFilePondProps {
    uploadUrl: string;
    onFileUploadSuccess: (filePath: string) => void;
}

const UploadFilePond: React.FC<UploadFilePondProps> = ({ uploadUrl, onFileUploadSuccess }) => {
    const [files, setFiles] = useState<any[]>([]);
    const [uploadedFilePath, setUploadedFilePath] = useState("");

    const t = useTranslations("ADMIN.FIELDS");

    return (
        <FilePond
            files={files}
            allowMultiple={false}
            maxFileSize="2MB"
            acceptedFileTypes={["image/png", "image/gif", "image/jpeg", "image/webp", "image/avif"]}
            labelMaxFileSizeExceeded="File is too large"
            labelFileTypeNotAllowed="File of invalid type"
            server={{
                process: {
                    url: uploadUrl,
                    method: "POST",
                    onload: (response) => {
                        const res = JSON.parse(response);
                        setUploadedFilePath(res.filePath);
                        onFileUploadSuccess(res.filePath);
                        return res.filePath;
                    },
                    onerror: (response) => console.error("Error uploading file:", response)
                }
            }}
            onupdatefiles={setFiles}
            name="files"
            labelIdle={`${t("Drag files")} <span class="filepond--label-action">${t("Choose")}</span>`}
        />
    );
};

export default UploadFilePond;
