import {type PropsWithChildren, useState} from "react";
import {DrawerContext} from "./DrawerContext";

export function DrawerProvider({ children }: PropsWithChildren) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPinned, setIsPinned] = useState(false);

    const openDrawer = () => setIsOpen(true);
    const closeDrawer = () => {
        if (!isPinned) setIsOpen(false);
    };
    const togglePin = () => setIsPinned((prev) => !prev);

    return (
        <DrawerContext.Provider
            value={{ isOpen, isPinned, openDrawer, closeDrawer, togglePin }}
        >
            {children}
        </DrawerContext.Provider>
    );
}