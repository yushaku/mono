import { Card } from "@/components/card";
import { fetchPages, fetchPagesByCategory } from "@/utils/notion";

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const blogList = await fetchPagesByCategory(params.slug);
  // const relatedBlog = await fetchPages();

  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {blogList.results.map((el) => {
        return (
          <li key={el.id}>
            <Card
              summary={el.properties?.tldr?.rich_text[0]?.plain_text}
              author={el.created_by.id}
              imageUrl={el.cover?.external?.url}
              slug={el.properties.slug.rich_text[0].plain_text}
              name={el.properties.Name.title[0].plain_text}
              date={el.created_time}
            />
          </li>
        );
      })}
    </ul>
  );
}
