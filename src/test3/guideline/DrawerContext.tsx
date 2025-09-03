import { createContext, useContext } from "react";

type DrawerContextType = {
    isOpen: boolean;
    isPinned: boolean;
    openDrawer: () => void;
    closeDrawer: () => void;
    togglePin: () => void;
};

export const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function useDrawer() {
    const ctx = useContext(DrawerContext);
    if (!ctx) throw new Error("useDrawer must be used within DrawerProvider");
    return ctx;
}
