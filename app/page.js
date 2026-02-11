import Link from "next/link";

const path = process.env.NEXT_PUBLIC_API_URL;

async function getProjects() {
  const res = await fetch(
    `${path}/api/projects?populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch projects");
  }

  const data = await res.json();
  return data.data;
}

export default async function Home() {
  const projects = await getProjects();
console.log(projects);
  return (
    <main>
      <h1>My Portfolio</h1>

      {projects.map((project) => {
        const imageUrl = `${path}${project.Cover.url}`;

        return (
          <article key={project.id}>
            <h2>
              <Link href={`/projects/${project.slug}`}>
                {project.Title}
              </Link>
            </h2>
            {imageUrl && (
              <img
                src={imageUrl}
                alt={project.Title}
                width="300"
              />
            )}
            <p>{project.Description}</p>
          </article>
        );
      })}
    </main>
  );
}