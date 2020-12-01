import React,{useState,useEffect} from 'react';
import UploadServices from './services/FileUploadService';
import {Modal,Spinner} from 'react-bootstrap';
import path from 'path';

const FileUploads = (props) => {
    const [selectedFiles,setSelectedFiles] = useState(undefined);
    const [currentFile,setCurrentFile] = useState(undefined);
    const [progress,setProgress] = useState(0);
    const [message,setMessage] = useState("");
    const [notify,setNotify] = useState('');
    const selectFile = (e) => {
        const ext = path.extname(e.target.files[0].name);
        let isValid = props.types.some( type => type === ext);
        if(!isValid){
               setNotify('Use extension properly !!!');
               setSelectedFiles(undefined)
        }
        setSelectedFiles(e.target.files);  
    }
    
    
    const upload = () =>{
        let currentFile = selectedFiles[0];
        setProgress(0);
        setCurrentFile(currentFile);

        UploadServices.upload(currentFile,(event) =>{
            setProgress(Math.round((100*event.loaded)/event.total));
        })
            .then(response =>{
                const urlData = response.data.url;
                props.getUrls(urlData);
                setMessage(response.data.message);
            })
            .catch( (e) =>{
                setProgress(0);
                setMessage(e.response.data.message);
                setCurrentFile(undefined);
            })

        setSelectedFiles(undefined);
    }

    useEffect(() => {
        if (notify){
            setTimeout( () =>{
                setNotify('');
            },2000)
        }
        if(message){
            setTimeout( () =>{
                setCurrentFile(undefined);
                setMessage('');
            },2500)
        }
    },[notify,message])
     
    return (
            
            <Modal show={props.show} onHide={props.closeModal}>
                <div className="uploader-container">
                    <Modal.Header closeButton >
                        <h3>Upload your file here</h3>
                    </Modal.Header>
                    <div className="modal-uploader">
                        <Modal.Body>
                                <div className="py-3 progress-loader">
                                    {currentFile && (
                                        <div className="progress">
                                            <div className="progress-bar progress-bar-info progress-bar-striped" 
                                            role="progressbar" 
                                            aria-valuenow={progress} 
                                            aria-valuemin="0" aria-valuemax="100" 
                                            style={{width:progress+"%"}}>
                                                {progress} %
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="custom-file">
                                    <input type="file"   onChange={selectFile}/>     
                                </div>

                                <button className="btn btn-success w-100 my-1" disabled={!selectedFiles || notify} onClick={upload}>
                                    Upload
                                </button>
                                
                                <div className="alert text-success text-center" role="alert">
                                    {message}
                                    {notify && <div className="text-danger">{notify}</div>}
                                    {currentFile && <p className="text-success">{progress >= 1 && ! message ? <div><Spinner as="span" animation="grow" size="sm" role="status"aria-hidden="true"/> <div>Waiting to be completed.</div></div>: null}</p>}
                                </div>    
                        </Modal.Body>
                    </div>
                </div>
            </Modal>
          
    )
}

export default FileUploads