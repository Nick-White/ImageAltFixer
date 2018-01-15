let PATH_SEPARATOR: string = "/";
let MINIMUM_FILE_NAME_LENGTH: number = 5;

function guessFileName(url: string): string | undefined {
    let pathName: string = new URL(url).pathname;
    if (pathName.indexOf(PATH_SEPARATOR) != 0) {
        return undefined;
    }
    let fileNameBeginIndex = pathName.lastIndexOf(PATH_SEPARATOR) + 1;
    if (fileNameBeginIndex === pathName.length) {
        return undefined;
    }
    let fileName: string = pathName.slice(fileNameBeginIndex);
    if (fileName.length < MINIMUM_FILE_NAME_LENGTH) {
        return undefined;
    }
    return fileName;
}

let MINIMUM_ALT_LENGTH = 2;

function fixImageAlt(image: HTMLImageElement): void {
    if (image.alt.trim().length < MINIMUM_ALT_LENGTH) {
        let fileName: string | undefined = guessFileName(image.src)
        image.alt = ((typeof fileName !== "undefined") ? fileName : image.src);
    }
    // Make sute it's visible on some backgrounds
    image.style.color = 'red';
    image.style.fontSize = '20px';
}

let imageObserver: MutationObserver = new MutationObserver((mutations: MutationRecord[]): void => {
    for (let i: number = 0, mutationsLength: number = mutations.length; i < mutationsLength; i++ ) {
        let mutation: MutationRecord = mutations[i];
        let addedNodes: NodeList = mutation.addedNodes;
        for (let j: number = 0, addedNodesLength: number = addedNodes.length; j < addedNodesLength; j++) {
            let addedNode: Node = addedNodes[j];
            if (addedNode.nodeName.toLowerCase() == 'img') {
                fixImageAlt(<HTMLImageElement>addedNode);
            }
        } 
   }
});
imageObserver.observe(document, {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true
});

let existingImages: NodeListOf<HTMLImageElement> = document.getElementsByTagName('img');
for (let i: number = 0, existingImagesLength: number = existingImages.length; i < existingImagesLength; i++) {
    let existingImage: HTMLImageElement = existingImages[i];
    fixImageAlt(existingImage);
}