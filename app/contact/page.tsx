export default function Contact() {
    return (
        <main className="min-h-screen bg-[#F5F2EB] text-[#000000] p-12 md:p-24 font-geo">
            <div className="max-w-4xl mx-auto space-y-12 animate-fade-in-up">
                <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase">Get In Touch</h1>
                <div className="flex flex-col space-y-8 text-2xl md:text-4xl font-bold tracking-tight">
                    <a href="mailto:hello@example.com" className="hover:italic transition-all duration-300">
                        HELLO@EXAMPLE.COM
                    </a>
                    <a href="tel:08123456789" className="hover:italic transition-all duration-300">
                        +62 812 3456 789
                    </a>
                    <a href="https://www.instagram.com/zaidhifdzulm/" target="_blank" rel="noopener noreferrer" className="hover:italic transition-all duration-300">
                        INSTAGRAM
                    </a>
                </div>
            </div>
        </main>
    )
}