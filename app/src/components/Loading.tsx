export function Loading() {
    return (
            <div className="w-100 rounded shadow-2xl text-center">
                <div className="py-5">
                    <div className="h-16 rounded-sm bg-gray-200 animate-pulse mb-4"></div>
                    <div className="grid grid-cols-4 gap-2">
                        <div className="col-span-4 h-10 rounded-sm bg-gray-300 animate-pulse"></div>
                        <div className="col-span-4 h-10 rounded-sm bg-gray-200 animate-pulse"></div>
                        <div className="col-span-4 h-10 rounded-sm bg-gray-300 animate-pulse"></div>
                        <div className="col-span-4 h-10 rounded-sm bg-gray-200 animate-pulse"></div>
                    </div>
                </div>
            </div>
    )
}
