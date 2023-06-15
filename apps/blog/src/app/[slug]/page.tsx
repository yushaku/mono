import { BlogOutline, IntroBlock } from "@/components/IntroBlock";
import { Layout } from "@/components/Layout";
import { fetchPageBlocks, fetchPageBySlug } from "@/utils/notion";
import { Render } from "@9gustin/react-notion-render";
import "@9gustin/react-notion-render/dist/index.css";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);
  console.log(JSON.stringify(blocks));

  return (
    <Layout>
      <section className="grid grid-cols-3 gap-10">
        <article className="col-span-2">
          <Render blocks={blocks} useStyles />
        </article>

        <article className="relative col-span-1">
          <IntroBlock />
          <BlogOutline />
        </article>
      </section>
    </Layout>
  );
}
