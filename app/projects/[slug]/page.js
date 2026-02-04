async function getProject(slug) {

  const res = await fetch(
    `http://localhost:1337/api/projects?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch project");
  }
  
  const data = await res.json();
  console.log(data);
  return data.data[0];
}

export default async function ProjectPage({ params }) {
  const {slug} = await params;
  const project = await getProject(slug);

  if (!project) {
    return <h1>Project not found</h1>;
  }

  const { Title, Description, Cover } = project;
  const imageUrl = `http://localhost:1337${Cover.url}`;

  return (
    <main>
      <h1>{Title}</h1>

      {imageUrl && (
        <img src={imageUrl} alt={Title} width="400" />
      )}

      <p>{Description}</p>
    </main>
  );
}
