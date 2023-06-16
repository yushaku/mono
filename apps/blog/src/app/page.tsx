import { CategoryList, IntroBlock, RelatePosts } from "@/components/IntroBlock";
import { TopicTitle } from "@/components/TopicTitle";
import { BigCard, Card } from "@/components/card";
import { fetchPages } from "@/utils/notion";

export default async function Home() {
  const blogList = await fetchPages();
  const firstResult = blogList.results.shift();

  return (
    <section className="grid grid-cols-1 gap-x-10 px-6 md:grid-cols-2 md:px-3 lg:grid-cols-3 lg:p-0">
      <div className="md:col-span-2">
        <BigCard
          summary={firstResult.properties.tldr.rich_text[0].plain_text}
          author={firstResult.created_by.id}
          imageUrl={firstResult.cover.external.url}
          slug={firstResult.properties.slug.rich_text[0].plain_text}
          name={firstResult.properties.Name.title[0].plain_text}
          date={firstResult.created_time}
        />

        <TopicTitle title="Latest Posts" className="my-12" />

        <ul className="flex flex-wrap justify-center gap-6">
          {blogList.results.map((el) => {
            return (
              <li key={el.id}>
                <Card
                  summary={el.properties.tldr.rich_text[0].plain_text}
                  author={el.created_by.id}
                  imageUrl={el.cover.external.url}
                  slug={el.properties.slug.rich_text[0].plain_text}
                  name={el.properties.Name.title[0].plain_text}
                  date={el.created_time}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="md:hidden">
        <TopicTitle title="Relate Topics" className="my-12 text-2xl" />
      </div>

      <div className="col-span-1 flex flex-wrap md:col-span-2 lg:col-span-1">
        <IntroBlock />
        <RelatePosts blogList={blogList.results} />
        <CategoryList />
      </div>
    </section>
  );
}
