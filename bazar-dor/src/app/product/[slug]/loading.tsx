export default function Loading() {
    return <div className="container py-8 min-h-[65vh]" aria-label="লোড হচ্ছে">
        <div className="surface animate-pulse p-6 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="h-20 w-20 rounded-2xl bg-[#dfece2]" />
                <div className="flex-1 space-y-3">
                    <div className="h-9 w-64 rounded bg-[#dfece2]" />
                    <div className="h-5 max-w-xl rounded bg-[#dfece2]" />
                    <div className="h-7 w-40 rounded bg-[#dfece2]" />
                </div>
                <div className="h-32 w-36 rounded-2xl bg-[#dfece2]" />
            </div>
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {Array.from({ length: 3 }, (_, index) => <div key={index} className="h-24 rounded-xl bg-[#dfece2]" />)}
            </div>
            <div className="mt-7 h-56 rounded-xl bg-[#dfece2]" />
        </div>
    </div>;
}
