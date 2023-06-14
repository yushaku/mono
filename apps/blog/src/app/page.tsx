import { BigCard, Card } from "@/components/card";
import { fetchPages } from "@/utils/notion";
import Link from "next/link";
import {
  IconArrowRight,
  IconGithub,
  IconLinkedin,
  IconWaveLine,
  SocialMedia,
} from "ui";
import { ListItem } from "../components/ListItem";
import { topics } from "../utils/constants";
import { TopicTitle } from "@/components/TopicTitle";

export default async function Home() {
  const blogList = await fetchPages();
  const firstResult = blogList.results.shift();

  return (
    <section className="grid grid-cols-3 gap-x-10">
      <div className="col-span-2">
        <BigCard
          summary={firstResult.properties.tldr.rich_text[0].plain_text}
          author={firstResult.created_by.id}
          imageUrl={firstResult.cover.external.url}
          slug={firstResult.properties.slug.id}
          name={firstResult.properties.Name.title[0].plain_text}
          date={firstResult.created_time}
        />

        <TopicTitle title="Latest Posts" className="my-12" />

        <ul className="flex flex-wrap gap-6">
          {blogList.results.map((el) => {
            return (
              <li key={el.id}>
                <Card
                  summary={el.properties.tldr.rich_text[0].plain_text}
                  author={el.created_by.id}
                  imageUrl={el.cover.external.url}
                  slug={el.properties.slug.id}
                  name={el.properties.Name.title[0].plain_text}
                  date={el.created_time}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className="col-span-1">
        <article className="mb-10 flex flex-col items-center justify-center gap-y-4 rounded-lg px-6 py-8 text-center shadow-lg">
          <h3 className="text-primaryColor text-xl font-semibold">
            Dev "phèn"
          </h3>
          <p className="text-grayColor text-sm">
            Become better React developer. Following our tips, tricks and real
            life experiences.
          </p>
          <SocialMedia />
        </article>

        <article className="mb-10 flex flex-col items-center justify-center gap-y-4 rounded-lg px-6 py-8 text-center shadow-lg">
          <TopicTitle title="Popular Posts" />

          <ul className="divide-y">
            {blogList.results.map((el) => {
              return (
                <li key={el.id}>
                  <ListItem
                    imageUrl={el.cover.external.url}
                    name={el.properties.Name.title[0].plain_text}
                    date={el.created_time}
                  />
                </li>
              );
            })}
          </ul>
        </article>

        <article className="mb-10 flex flex-col items-center justify-center gap-y-4 rounded-lg px-6 py-8 text-center shadow-lg">
          <TopicTitle title="Explore Topics" />

          <ul className="w-full divide-y">
            {topics.map((el, index) => {
              return (
                <li key={index} className="group ">
                  <Link href={el.href} className="flex items-center py-3 ">
                    <IconArrowRight
                      className="animationShow mr-2 rotate-180 group-hover:mr-4"
                      color="#234f66"
                    />
                    <span className="group-hover:text-primaryColor animationShow group-hover:font-bold">
                      {el.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </article>
      </div>
    </section>
  );
}
