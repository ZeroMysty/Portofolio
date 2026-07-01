export default function Project() {
    const projects = [
        { title: "Project Alpha", desc: "A cutting-edge web application built with Next.js and Tailwind CSS." },
        { title: "Project Beta", desc: "An interactive robotics interface designed for real-time control." },
        { title: "Project Gamma", desc: "A comprehensive e-commerce platform with seamless payment integration." }
    ];

    return (
        <main className="min-h-screen bg-[#F5F2EB] text-[#000000] p-12 md:p-24 font-geo">
            <div className="max-w-6xl mx-auto space-y-16 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">Selected Works</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((proj, idx) => (
                        <div key={idx} className="group border border-[#000000]/10 p-8 hover:bg-[#000000] hover:text-[#F5F2EB] transition-colors duration-500 cursor-pointer">
                            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wider">{proj.title}</h2>
                            <p className="text-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500">
                                {proj.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}