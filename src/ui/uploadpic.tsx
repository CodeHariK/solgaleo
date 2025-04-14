import { useSpaceContext } from "./spaceform";
import { createSignal, type JSX } from 'solid-js';
import { CssUI } from './gen';

/* CSS:
.UploadContainer {
    // display: inline-block;
    border: 2px dashed var(--primary);
    margin: 0.5rem;
    border-radius: 1rem;
    padding: 1rem;
    flex-direction: column;
    align-items: baseline;
    width: max-content;
}

.Dropzone {
    min-height: 250px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
}
.DropzoneDragging {
    background: var(--surface);
}

.ImagePreview {
    // width: 100%;
    height: auto;
    flex-shrink: 0;
    display: block;
    margin: 0 auto;
}
.ImagePreviewInvalid {
    filter: blur(8px);
}

.InvalidMessage {
    position: absolute;
    color: var(--surface);
    background: var(--primary);
    padding: 0.5rem;
    border-radius: 0.25rem;
}

.HiddenInput {
    display: none;
}
*/

type FileUploaderProps = {
    name: string;
    header?: string;
    accept: string[];
    uploadFunc: (formdata: FormData) => { valid: boolean, info: JSX.Element };
};

export function FileUploader(props: FileUploaderProps) {
    const [fileValid, setFildValid] = createSignal(true);
    const [fileInfo, setFileInfo] = createSignal<JSX.Element>();
    const [imageSrc, setImageSrc] = createSignal('');
    const [isDragging, setIsDragging] = createSignal(false);
    const [fileInputRef, setFileInputRef] = createSignal<HTMLInputElement | null>(null);

    const { state, handleChange } = useSpaceContext();

    const uploadFile = async () => {
        const formData = state().values[props.name];
        if (!formData) {
            alert('Please select a file.');
            return;
        }

        try {
            let { valid, info } = props.uploadFunc(formData)
            setFildValid(valid)
            setFileInfo(info)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    function handleFormData(file: File | string) {
        const formData = new FormData();

        if (file instanceof File) {
            formData.append('file', file);
        } else if (typeof file === "string") {
            if (file.startsWith("data:image")) {
                formData.append('data', file);
            } else {
                formData.append('url', file);
            }
        }

        formData.forEach((_value, key) => {
            console.log(key, _value)
        })

        handleChange(props.name, formData);
    }

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setIsDragging(false);

        setFildValid(true)

        const items = event.dataTransfer?.items;

        // for (let i = 0; i < items.length; i++) {
        //     console.log(items[i], items[i].kind, items[i].type)
        // }

        if (items && items[0].kind === 'file') {
            // os file drag
            const file = items[0].getAsFile();
            console.log(file.type)
            if (file && startsWithPattern(file.type, props.accept)) {
                if (startsWithPattern(file.type, ["image/"])) {
                    setImageSrc(URL.createObjectURL(file));
                }
                handleFormData(file);
            }
        } else {
            // browser file drag
            const url = event.dataTransfer?.getData('text/uri-list');
            if (url) {
                setImageSrc(url);

                handleFormData(url);
            }
        }
    };

    const handleFileInputChange = (event: Event) => {
        setFildValid(true)

        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);

                handleFormData(file);
            };

            // Reset the input value to allow the same file to be uploaded again
            target.value = '';
        }
    };

    return (

        <fieldset>
            {props.header && <legend>{props.header}</legend>}

            <div class={CssUI.UploadContainer}>
                <div
                    class={`${CssUI.Dropzone} ${isDragging() ? CssUI.DropzoneDragging : ''}`}
                    onDragOver={(event) => {
                        event.preventDefault();
                        setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    onClick={() => { fileInputRef()?.click() }}
                >
                    {!imageSrc() ? (
                        "Drag and drop an image here"
                    ) : (
                        <img
                            class={`${CssUI.ImagePreview} ${!fileValid() ? CssUI.ImagePreviewInvalid : ''}`}
                            src={imageSrc()}
                            onChange={(_) => {
                                setFildValid(true)
                            }}
                            onError={(_) => {
                                setFildValid(false)
                            }}
                        />
                    )}
                    {(imageSrc() && !fileValid()) && (
                        <div class={CssUI.InvalidMessage}>Image not valid</div>
                    )}
                </div>

                {state().values[props.name] &&
                    (() => {
                        const file = state().values[props.name].get('file') as File;

                        if (!file) return

                        return <>
                            <p>Name: {file.name}</p>
                            <p>Size: {(file.size / 1024).toFixed(2)} KB</p>
                            <p>Type: {file.type}</p>
                            <p>Last Modified: {new Date(file.lastModified).toLocaleString()}</p>
                        </>
                    })()
                }

                {fileInfo()}

                <input
                    name={props.name}
                    type="file"
                    accept={props.accept.join(",")}
                    class={CssUI.HiddenInput}
                    ref={setFileInputRef}
                    onChange={handleFileInputChange}
                />
                <button
                    onClick={(event) => {
                        event.preventDefault();
                        if (imageSrc()) {
                            uploadFile();
                        } else {
                            fileInputRef()?.click();
                        }
                    }}
                >
                    {imageSrc() ? 'Upload' : 'Select'}
                </button>
            </div>
        </fieldset>
    );
};

function startsWithPattern(inputString: string, patterns: string[]) {
    for (const pattern of patterns) {
        // Convert the string pattern to a RegExp object
        const regex = new RegExp('^' + pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'));

        // Test the input string against the regex
        if (regex.test(inputString)) {
            return true; // Return true if there's a match
        }
    }
    return false; // Return false if no patterns match
}
