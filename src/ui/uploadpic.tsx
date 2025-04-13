import { createSignal, type JSX } from 'solid-js';
import { CssUI } from './gen';

/* CSS:
.UploadContainer {
    display: inline-block;
}

.Dropzone {
    width: 300px;
    height: 250px;
    border: 2px dashed var(--primary);
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    margin: 0.5rem;
    border-radius: 1rem;
    color: var(--secondary);
}
.DropzoneDragging {
    border-color: var(--primary);
    color: var(--primary);
}

.ImagePreview {
    width: 100%;
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

type ImageUploaderProps = {
    uploadFunc: (formdata: FormData) => { valid: boolean, info: JSX.Element };
};

export function ImageUploader(props: ImageUploaderProps) {
    const [imageValid, setImageValid] = createSignal(true);
    const [imageCategories, setImageCategories] = createSignal<JSX.Element>();
    const [imageSrc, setImageSrc] = createSignal('');
    const [isDragging, setIsDragging] = createSignal(false);
    const [fileInputRef, setFileInputRef] = createSignal<HTMLInputElement | null>(null);
    const [selectedFile, setSelectedFile] = createSignal<File | string | null>(null);

    const uploadFile = async () => {
        const file = selectedFile();
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('item', file);

        console.log('File from FormData:', formData.get('item'));

        try {
            let { valid, info } = props.uploadFunc(formData)
            setImageValid(valid)
            setImageCategories(info)
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    const handleDrop = (event: DragEvent) => {
        event.preventDefault();
        setIsDragging(false);
        const items = event.dataTransfer?.items;

        if (items && items[0].kind === 'file') {
            // os file drag
            const file = items[0].getAsFile();
            if (file && file.type.startsWith('image/')) {
                setImageSrc(URL.createObjectURL(file));
                setSelectedFile(file);
            } else {
                alert('Please drop a valid image file.');
            }
        } else {
            // browser file drag
            const url = event.dataTransfer?.getData('text/uri-list');
            if (url) {
                setImageSrc(url);
                setSelectedFile(url)
            }
        }
    };

    const handleFileInputChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImageSrc(reader.result as string);
                setSelectedFile(file);
            };

            // Reset the input value to allow the same file to be uploaded again
            target.value = '';
        }
    };

    return (
        <div class={CssUI.UploadContainer}>
            <div
                id="dropzone"
                class={`${CssUI.Dropzone} ${isDragging() ? CssUI.DropzoneDragging : ''}`}
                onDragOver={(event) => {
                    event.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => {
                    setImageValid(true)
                    fileInputRef()?.click()
                }}
            >
                {!imageSrc() ? (
                    "Drag and drop an image here"
                ) : (
                    <img
                        id="imagePreview"
                        class={`${CssUI.ImagePreview} ${!imageValid() ? CssUI.ImagePreviewInvalid : ''}`}
                        src={imageSrc()}
                    />
                )}
                {(imageSrc() && !imageValid()) && (
                    <div class={CssUI.InvalidMessage}>Image not valid</div>
                )}
            </div>
            {imageCategories()}
            <input
                type="file"
                id="fileInput"
                accept="image/*"
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
                        setImageValid(true)
                        fileInputRef()?.click();
                    }
                }}
            >
                {imageSrc() ? 'Upload' : 'Select Image'}
            </button>
        </div>
    );
};
