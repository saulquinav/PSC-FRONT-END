// Function used to convert a file to a string in order to upload the file
// from front-end to back-end
export function fileToBase64(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64 = (reader.result as string).split(',')[1]; // remove data URL prefix
            resolve(base64);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // this gives a base64-encoded string
    });
}

// Function used to convert a string to a file (Blob) in order to download a
// file from the back-end to the front-end
function base64ToBlob(base64: string, mimeType: string): Blob {
    const binary = atob(base64);
    const array = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        array[i] = binary.charCodeAt(i);
    }
    return new Blob([array], { type: mimeType });
}