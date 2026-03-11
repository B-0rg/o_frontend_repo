import Link from "next/link";
import Image from "next/image";
import cloudinaryUrl from "./utils";

const path = process.env.NEXT_PUBLIC_API_URL;
// export const revalidate = 86400 // regen 1x par jour

export const metadata = {
  title: "b0rg — Digital Archive",
  description: "b0rg portfolio : design, experimental and artistic projects.",
  keywords: ["Portfolio", "Digital Art", "Creative Projects", "b0rg"],
  robots: "index, follow",
  authors: [{ name: "borg" }],
  openGraph: {
    type: "website",
    title: "b0rg — Digital Archive",
    description: "b0rg portfolio : design, experimental and artistic projects.",
    url: "https://b0rg.ch",
    siteName: "b0rg",
    images: [
      {
        url: "/og-image.jpg", // image statique ou générée Cloudinary
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "b0rg — Digital Archive",
    description: "Portfolio de b0rg : projets créatifs et archives digitales.",
    images: ["/og-image.jpg"], // image statique ou générée Cloudinary
    site: "@b0rg",
  },
};

async function getProjects() {
  try{
    const res = await fetch(
      `${path}/api/projects?populate=*`,
      { next: { revalidate: 86400 } }
    );
  
    if (!res.ok) {
        console.error("Strapi error:", res.status);
        return [];
    }
  
    const data = await res.json();
    return data.data || [];
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
}

export default async function Home() {
  const projects = await getProjects();
console.log(projects);
  return (
    <main>
      <h1>My Portfolio</h1>

      {projects.length === 0 && <p>Not available at the moment.</p>}

      {projects.map((project) => {
        const imageUrl = project.Cover.url;

        return (
          <article key={project.id}>
            <h2>
              <Link href={`/projects/${project.slug}`}>
                {project.Title}
              </Link>
            </h2>
            {imageUrl && (
              <Image
                src={cloudinaryUrl(imageUrl)}
                alt={project.Title}
                width={600}
                height={400}
                style={{ objectFit: "cover" }}
                priority
              />
            )}
            <p>{project.Description}</p>
          </article>
        );
      })}
    </main>
  );
}