const convertFileToBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file.rawFile);

  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});

const firebaseUploadHandler = (requestHandler) => (type: string, resource: string, params: IParamsUpdate) => {
  // Check if file is within upload options

  // const resourcesWithFiles = this.options.files_at.map((f) => f.collection);
  // if (!(resourceName in resourcesWithFiles)) {
  //   // for other request types and resources, fall back to the default request handler
  //   return requestHandler(type, resource, params);
  // }
  // if (resourceName in  params.data) {

  // only freshly dropped pictures are instance of File
  console.log('Upload handler', {type,resource,params});
  if (type === 'UPDATE' && resource === 'posts') {
    const pictures = params.data['pictures'];
    console.log({pictures});
    if (pictures && pictures.length) {
      const formerPictures = pictures.filter(p => !(p.rawFile instanceof File));
      const newPictures: File[] = pictures.filter(p => p.rawFile instanceof File);
      
      return Promise.all(newPictures.map(convertFileToBase64))
      .then(base64Pictures => base64Pictures.map(picture64 => ({
        src: picture64,
        title: `${newPictures[0].name}`,
      })))
      .then(transformedNewPictures => requestHandler(type, resource, {
        ...params,
        data: {
          ...params.data,
          pictures: [...transformedNewPictures, ...formerPictures],
        },
      }));
    }
  } else {
    console.log('Not an upload request');
    requestHandler(type, resource, params);
  }
}

export default firebaseUploadHandler;
