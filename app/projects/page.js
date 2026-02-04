async function getProjects() {
  const res = await fetch(
    "http://localhost:1337/api/projects?populate=*",
    { cache: "no-store" }
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
