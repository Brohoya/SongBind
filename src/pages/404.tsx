import Link from "next/link";

export default function Custom404() {

    return (
        <main>
            <h1>404 - Cette page n&apos;existe pas 🕵️‍♂️</h1>
            <iframe width="1024" height="576" src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" title="Rick Astley - Never Gonna Give You Up (Official Music Video)" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>

            <Link href="/">
                <button>Go home</button>
            </Link>        
        </main>
    )
}