
import React from 'react';
import { PillIcon } from './icons';

const Header = () => {
    return (
        <header className="bg-gradient-to-r from-teal-600 to-teal-500 shadow-lg">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col items-center text-center sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white/20 rounded-full">
                            <PillIcon className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">
                            PharmaLens
                        </h1>
                    </div>
                    <p className="mt-3 text-teal-100 text-lg font-medium sm:mt-0">
                        Your AI-powered medication safety assistant
                    </p>
                </div>
            </div>
        </header>
    );
};

export default Header;
