import {Link, useNavigate} from "react-router";

export function Home() {
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8">
            <header className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">👋 Welcome to Test Hub</h1>
                <button
                    onClick={() => navigate("/test1")}
                    className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                >
                    Start → /test1
                </button>
            </header>

            {/* Nav to 3 tests */}
            <section>
                <h2 className="text-lg font-semibold mb-3">Đi tới các bài test</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                    {[
                        { to: "/test1", title: "Test 1", desc: "Bài test số 1" },
                        { to: "/test2", title: "Test 2", desc: "Bài test số 2" },
                        { to: "/test3", title: "Test 3", desc: "Bài test số 3" },
                    ].map((t) => (
                        <Link
                            key={t.to}
                            to={t.to}
                            className="block border rounded-lg p-4 hover:shadow transition"
                        >
                            <div className="font-semibold">{t.title}</div>
                            <div className="text-sm text-gray-600">{t.desc}</div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Test 4 description (lazy load) */}
            <section className="border rounded-lg p-4 bg-white">
                <h2 className="text-lg font-semibold">Test 4: Lazy load các trang test</h2>
                <p className="text-sm text-gray-700 mt-2">
                    Kỹ thuật <span className="font-medium">lazy load</span> dùng để làm gì?
                    Hãy tạo thư mục test4/README.md để mô tả về lazy load và lợi ích nó đem lại
                </p>

                <Link
                    to="/test1"
                    className="inline-block mt-3 text-blue-600 underline"
                >
                    Thử điều hướng & xem loader →
                </Link>
            </section>
        </div>
    );
}
