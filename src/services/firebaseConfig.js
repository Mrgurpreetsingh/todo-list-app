// src/config/firebaseConfig.js

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAJWI4BHWGGbUpMR0DGKE5qVBrOZ_ZfbuM', // de google-services.json > client[0].api_key[0].current_key
  authDomain: 'todolistapp-635c9.firebaseapp.com', // construit comme projectId + ".firebaseapp.com"
  projectId: 'todolistapp-635c9', // de project_info.project_id
  storageBucket: 'todolistapp-635c9.appspot.com', // de project_info.storage_bucket, remplace "firebasestorage.app" par "appspot.com"
  messagingSenderId: '662459608639', // de project_info.project_number
  appId: '1:662459608639:android:6c49e2d759417790c7128a', // de client[0].client_info.mobilesdk_app_id
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
