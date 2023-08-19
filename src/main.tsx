import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Toaster} from "react-hot-toast";
import {AuthProvider} from "./providers/auth_provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App/>
            <Toaster/>
        </AuthProvider>
    </React.StrictMode>,
)
