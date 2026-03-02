import Image from "next/image";
import cloudinaryUrl from "../../utils";

async function getProject(slug) {

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
        console.error("Strapi error:", res.status);
        return [];
    }
  
  const data = await res.json();
  return data.data[0] || [];
}

export default async function ProjectPage({ params }) {
  const {slug} = await params;
  const project = await getProject(slug);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  const { Title, Description, Cover } = project;
  const imageUrl = Cover.url;

  return (
    <main>
      <h1>{Title}</h1>

      {imageUrl && (
        <Image
                        src={cloudinaryUrl(imageUrl)}
                        alt={Title}
                        width={600}
                        height={400}
                        style={{ objectFit: "cover" }}
                        priority
                      />
      )}

      <p>{Description}</p>
    </main>
  );
}
