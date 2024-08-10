import { Fragment } from "react";

export const n2br = (text: string) => {
    return text.replace(/\\n/g, "\n").split("\n").map((line, index, array) => (
        <Fragment key={index}>
            {line}
            {index < array.length - 1 && <br />}
        </Fragment>
    ));
};
