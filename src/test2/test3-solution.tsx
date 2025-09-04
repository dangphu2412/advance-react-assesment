import { useState } from "react";

// Khi xử dụng index làm key, React sẽ không thể phát hiện được phần tử nào đã bị thay đổi, thêm hoặc xoá.
// Do đó, React sẽ không thể tối ưu hiệu suất và sẽ phải render lại toàn bộ component khi có thay đổi.
// Một vấn đề nữa là internal state của component sẽ không được quản lý đúng.

// Sự liên quan giữa react key, DOM ảo, DOM thật

// React key là một thuộc tính của component React, được sử dụng để định danh phần tử trong DOM.
// DOM ảo là một cấu trúc dữ liệu trong React, được sử dụng để quản lý việc render component.
// DOM thật là một cấu trúc dữ liệu trong DOM, được sử dụng để hiển thị component.
// Khi state thay đổi, React sẽ tạo ra một DOM ảo mới và so sánh với DOM thật để 
// tìm ra phần tử nào đã bị thay đổi, thêm hoặc xoá.
// Sau đó, React sẽ cập nhật DOM thật với DOM ảo.


// Khi state thay đổi, React sẽ tạo ra một DOM ảo mới và so sánh với DOM thật để tìm ra phần tử nào đã bị thay đổi, thêm hoặc xoá.
// Sau đó, React sẽ cập nhật DOM thật với DOM ảo.

// Ví dụ:
export default function Test3Solution() {
    const [items, setItems] = useState<string[]>(['']);
    return <div>
        <h1>Test 3 Solution</h1>
        {items.map((_, index) => (
            <Item key={index} onDelete={() => setItems(items.filter((_, i) => i !== index))} />
        ))}
        <button onClick={() => setItems([...items, 'item4'])}>Add Item</button>
    </div>
}

function Item({ onDelete }: { onDelete: () => void }) {
    const [value, setValue] = useState('');
    return <div className="flex gap-2 mt-2">
        <div>
            {value}
            <input className="border" placeholder="Item" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
        </div>
        <button onClick={onDelete}>Delete Item</button>
    </div>
}

// Trong trường hợp trên, sau khi bấm add 3 input, điền text vào input ở giữa và bấm delete input ở giữa,
// thì input ở cuối sẽ bị mất chứ không phải input ở giữa.

// Giải thích:

// Trên dom thật có 3 element, index 0, 1, 2.
// Khi bấm delete input ở giữa, 
// Trên dom ảo có 2 element, index 0, 1.
// React sẽ so sánh dom ảo với dom thật và thấy element ở index 2 bị xoá,
// Do đó, react sẽ xóa element ở index 2 trên dom thật.
