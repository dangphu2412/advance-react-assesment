import {useDrawer} from "./DrawerContext";
import {DrawerProvider} from "./Provider.tsx";

export function DrawerContainer() {
    return <DrawerProvider>
        <Drawer />
        <OpenDrawerButton />
    </DrawerProvider>
}

function OpenDrawerButton() {
    const { openDrawer } = useDrawer();

    return (
        <button
            onClick={openDrawer}
            className="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700"
        >
            Show Requirements
        </button>
    );
}

function Drawer() {
    const { isOpen, isPinned, closeDrawer, togglePin } = useDrawer();

    return (
        <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
            {/* Header */}
            <div className="flex justify-between items-center border-b px-4 py-3">
                <h2 className="font-semibold text-lg">Requirements</h2>
                <div className="flex gap-2">
                    <button
                        onClick={togglePin}
                        className={`px-3 py-1 rounded-md text-sm ${
                            isPinned ? "bg-blue-600 text-white" : "bg-gray-200"
                        }`}
                    >
                        {isPinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                        onClick={closeDrawer}
                        className="px-3 py-1 rounded-md text-sm bg-gray-200"
                    >
                        Close
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 text-sm space-y-2">
                <p className="font-medium">Your assignment:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Sử dụng react-thinking để chia bố cục và refactor chia lại các component từ Test3.tsx</li>
                    <li>Triển khai product filters (search, category, price, age) sử dụng React Context</li>
                    <li>Giả lập: dùng useEffect để sync dữ liệu từ hàm getProducts vào context</li>
                    <li>Filter products từ các filters state trong context</li>
                    <li>Triển khai kỹ thuật debounce cho search input</li>
                </ul>
            </div>
        </div>
    );
}
