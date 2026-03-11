async function getProjects() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/projects?populate=*`,
    { next: { revalidate: 86400 } }
  );

  const data = await res.json();
  return data.data;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <h1>All projects</h1>

      {projects.map((project) => (
        <article key={project.id}>
          <h2>
            <a href={`/projects/${project.slug}`}>
              {project.Title}
            </a>
          </h2>
        </article>
      ))}
    </main>
  );
}
