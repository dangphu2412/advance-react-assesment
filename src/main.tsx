import './main.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./Home.tsx";
import Test1 from './test1/Test1.tsx';
import Test2 from './test2/Test2.tsx';
import Test3 from './test3/Test3.tsx';
import {FormLogin1} from './test1/test1-solution-1.tsx';
import {FormLogin2} from './test1/test1-solution-2.tsx';
import {FormLogin3} from './test1/test1-solution-3.tsx';
import { FormLogin } from './test1/test2-solution.tsx';
createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/test1" element={<Test1 />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/" element={<Home />} />
            <Route path="/test1/test1-solution-1" element={<FormLogin1 />} />
            <Route path="/test1/test1-solution-2" element={<FormLogin2 />} />
            <Route path="/test1/test1-solution-3" element={<FormLogin3 />} />
            <Route path="/test1/test2-solution" element={<FormLogin />} />
        </Routes>
    </BrowserRouter>,

)
