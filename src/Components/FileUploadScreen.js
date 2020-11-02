import React,{useState} from 'react';
import UploadServices from './services/FileUploadService';
import {Modal} from 'react-bootstrap';



const FileUploads = (props) => {
    const [selectedFiles,setSelectedFiles] = useState(undefined);
    const [currentFile,setCurrentFile] = useState(undefined);
    const [progress,setProgress] = useState(0);
    const [message,setMessage] = useState("");

    const selectFile = (e) =>{
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
                const urlData = response.data;
                setMessage(response.data.message);
            })
            .catch( () =>{
                setProgress(0);
                setMessage('Could not upload the file !');
                setCurrentFile(undefined);
            })

        setSelectedFiles(undefined);
    }
     

    return (
            <Modal show={props.show} onHide={props.closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Upload your file here</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <div className="d-flex justify-content-center flex-column">
                            {props.able ?
                            <p>Change your profile.</p>
                             : 
                            <div>
                                <p>1.upload your cover book</p>
                                <p>2.upload you file book with epub extension</p>
                            </div>}
                        </div>
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
                        <input type="file"  onChange={selectFile}/>
                        

                        <button className="btn btn-success w-100 my-1" disabled={!selectedFiles} onClick={upload}>
                            Upload
                        </button>
                        
                        <div className="alert text-success text-center" role="alert">
                            {message}
                        </div>   
                </Modal.Body>
            </Modal>
       
    )
}


export default FileUploads