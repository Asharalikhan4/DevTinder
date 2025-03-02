import React, { FC } from "react";

interface CustomPageProps {
    children: React.ReactNode;
    className?: string;
}

const CustomPage: FC<CustomPageProps> = ({ children, className }) => {
    return (
        <div className={`px-4 py-2 md:px-8 md:py-4 ${className}`}>
            {children}
        </div>
    );
};

export default CustomPage;