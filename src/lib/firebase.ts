// Import the functions you need from the SDKs you need
import { set } from "date-fns";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyALgnnsgEVfiw7Ab4i0uePTxZM2D8XOCqY",
    authDomain: "devsync-ai.firebaseapp.com",
    projectId: "devsync-ai",
    storageBucket: "devsync-ai.firebasestorage.app",
    messagingSenderId: "292610903194",
    appId: "1:292610903194:web:a434f0d36223e2a9dd2323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);



export async function uploadFile(file: File, setProgress: (progress: number) => void) {
    return new Promise((resolve, reject) => {
        try {
            const storageRef = ref(storage, file.name);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on('state_changed', (snapshot) => {
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                if (setProgress) {
                    setProgress(progress)
                }
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            }, error => {
                reject(error)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    resolve(downloadURL)
                }
                )
            })

        } catch (error) {
            console.error(error)
            reject(error)
        }
    })
}