import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../../components/Navbar/Navbar';
import CustomCursor from '../../components/CustomCursor/CustomCursor';
import Footer from '../../components/Footer/Footer';

const MainLayout = () => {
    return (
        <div className='cursor-none'>
            <CustomCursor></CustomCursor>
            <header className='shadow-md bg-transparent backdrop-blur-3xl sticky z-50 top-0'>
                <Navbar></Navbar>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
            <footer id='contact'>
                <Footer></Footer>
            </footer>
        </div>
    );
};

export default MainLayout;