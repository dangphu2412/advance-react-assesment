import './main.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {lazy} from "react";
import {Home} from "./Home.tsx";

const Test1 = lazy(async () => import('./test1/Test1.tsx'))

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/test1" element={<Test1 />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>,

)
