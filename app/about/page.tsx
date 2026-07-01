export default function About() {
    return (
        <main className="min-h-screen bg-[#F5F2EB] text-[#000000] p-12 md:p-24 font-geo">
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">About Me</h1>
                <div className="space-y-6 text-xl md:text-2xl leading-relaxed text-[#4A4844]">
                    <p>
                        Hi, I'm <span className="font-bold text-black">Zeddz</span>, a software engineer with a passion for building cool stuff.
                    </p>
                    <p>
                        I'm a student at SMK Wikrama Bandung, majoring in Software Engineering. I enjoy crafting experiences that are both beautiful and functional, blending design with robust code.
                    </p>
                    <p>
                        When I'm not coding, I'm an active member of the Robotics Club and the Coding Club, exploring the latest in tech and collaborating with fellow enthusiasts.
                    </p>
                </div>
            </div>
        </main>
    )
}