import './main.css';
import {createRoot} from 'react-dom/client'
import {BrowserRouter, Route, Routes} from "react-router";
import {Home} from "./Home.tsx";
import Test1 from './test1/Test1.tsx';
import Test2 from './test2/Test2.tsx';
import Test3 from './test3/Test3.tsx';
import {StoreTraining} from "./external-store/StoreTraining.tsx";

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Routes>
            <Route path="/test1" element={<Test1 />} />
            <Route path="/test2" element={<Test2 />} />
            <Route path="/test3" element={<Test3 />} />
            <Route path="/store" element={<StoreTraining />} />
            <Route path="/" element={<Home />} />
        </Routes>
    </BrowserRouter>,

)
