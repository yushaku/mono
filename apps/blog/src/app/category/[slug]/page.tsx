import { CategoryList, IntroBlock, RelatePosts } from "@/components/IntroBlock";
import { TopicTitle } from "@/components/TopicTitle";
import { Card } from "@/components/card";
import { topics } from "@/utils/constants";
import { fetchPages, fetchPagesByCategory } from "@/utils/notion";
import Link from "next/link";
import { Button } from "ui";

export default async function Category({
  params,
}: {
  params: { slug: string };
}) {
  const blogList = await fetchPagesByCategory(params.slug);
  const relatedBlog = await fetchPages();

  return (
    <div className="grid grid-cols-1 gap-x-10 px-6 md:grid-cols-2 md:px-3 lg:grid-cols-3 lg:p-0">
      <div className="md:col-span-2">
        <div className="flex items-center gap-4">
          {topics.map((el, index) => {
            return (
              <Link href={`/category/${el.href}`} key={index}>
                <Button
                  className={`w-fit px-4 py-2  ${
                    params.slug === el.href
                      ? "bg-primaryColor text-white shadow-lg"
                      : "hover:text-primaryColor shadow-md"
                  }`}
                  title={el.title}
                />
              </Link>
            );
          })}
        </div>
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
        <RelatePosts blogList={relatedBlog.results} />
        <CategoryList />
      </div>
    </div>
  );
}
