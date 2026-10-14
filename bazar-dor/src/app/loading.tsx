function Skeleton({ className }: { className: string }) {
    return <div className={`animate-pulse rounded-xl bg-[#dfece2] ${className}`} aria-hidden="true" />;
}

export default function Loading() {
    return <div className="container py-7" aria-label="লোড হচ্ছে">
        <section className="surface p-6 sm:p-9 flex flex-col md:flex-row justify-between gap-6">
            <div className="flex-1 space-y-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-12 max-w-xl" />
                <Skeleton className="h-5 max-w-2xl" />
                <Skeleton className="h-11 w-36" />
            </div>
            <Skeleton className="h-48 w-48" />
        </section>
        <div className="mt-9 space-y-4">
            <Skeleton className="h-8 w-52" />
            <div className="product-grid">{Array.from({ length: 6 }, (_, index) => <Skeleton key={index} className="h-32" />)}</div>
        </div>
    </div>;
}
