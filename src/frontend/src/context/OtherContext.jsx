import React, { createContext, useState } from "react";

export const OtherContext = createContext();

export const OtherContextProvider = ({ children }) => {
    const [productId, setProductId] = useState([]);

    const addProduct = (sticker_id) => {
        setProductId(sticker_id);
    };

    return (
        <OtherContext.Provider value={{ addProduct, productId }}>
            {children}
        </OtherContext.Provider>
    );
};
