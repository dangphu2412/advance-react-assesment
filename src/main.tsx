import './main.css';
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./Home.tsx";
import { lazy, Suspense } from 'react';

const LazyTest1 = lazy(() => import('./test1/Test1.tsx'));
const LazyTest2 = lazy(() => import('./test2/Test2.tsx'));
const LazyTest3 = lazy(() => import('./test3/Test3.tsx'));

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/test1" element={<LazyTest1 />} />
                <Route path="/test2" element={<LazyTest2 />} />
                <Route path="/test3" element={<LazyTest3 />} />
                <Route path="/" element={<Home />} />
            </Routes>
        </Suspense>
    </BrowserRouter>,

)
