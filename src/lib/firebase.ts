// Import the functions you need from the SDKs you need
import { set } from "date-fns";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { get } from "http";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAN4HjlizDp6MMxhqjDCRq_954bCr0zupk",
    authDomain: "devsync-9e79d.firebaseapp.com",
    projectId: "devsync-9e79d",
    storageBucket: "devsync-9e79d.firebasestorage.app",
    messagingSenderId: "1065391302548",
    appId: "1:1065391302548:web:694f533c11fba1a9f01181"
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