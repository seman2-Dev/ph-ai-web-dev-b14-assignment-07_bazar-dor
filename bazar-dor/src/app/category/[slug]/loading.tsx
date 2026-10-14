export default function Loading() {
    return <div className="container py-8 min-h-[60vh]" aria-label="লোড হচ্ছে">
        <div className="surface p-6 animate-pulse">
            <div className="h-10 w-10 rounded-xl bg-[#dfece2]" />
            <div className="mt-4 h-8 w-48 rounded bg-[#dfece2]" />
            <div className="mt-2 h-4 w-64 rounded bg-[#dfece2]" />
        </div>
        <div className="mt-6 product-grid">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-32 animate-pulse rounded-xl bg-[#dfece2]" />)}</div>
    </div>;
}
