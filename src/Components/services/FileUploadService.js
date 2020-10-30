import http from '../../http-common';

const upload = (file,onUploadProgress) => {
    let formData = new FormData();

    formData.append('file',file);

    return http.post('/upload',formData,{
        headers:{
            "Content-type":"multipart/form-data"
        },
        onUploadProgress
    })
}

export default{
    upload
}