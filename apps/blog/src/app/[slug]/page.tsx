import {
  BlockCode,
  Heading2,
  Heading3,
  Paragraph,
} from "@/components/BlogDetail";
import { BlogOutline, IntroBlock } from "@/components/IntroBlock";
import { Layout } from "@/components/Layout";
import { fetchPageBlocks, fetchPageBySlug } from "@/utils/notion";
import {
  Render,
  indexGenerator,
  rnrSlugify,
  blockEnum,
  withContentValidation,
} from "@9gustin/react-notion-render";
import "@9gustin/react-notion-render/dist/index.css";
import { notFound } from "next/navigation";

export type TableOfContent = {
  id: string;
  href: string;
  title: string;
  type: blockEnum;
};

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await fetchPageBySlug(params.slug);
  if (!post) notFound();

  const blocks = await fetchPageBlocks(post.id);

  console.log(JSON.stringify(blocks));

  const tablecontent: TableOfContent[] = indexGenerator(blocks).map(
    ({ id, plainText, type }) => ({
      id,
      type,
      title: plainText,
      href: rnrSlugify(plainText),
    })
  );

  return (
    <Layout>
      <section className="grid grid-cols-3 gap-10">
        <article className="col-span-2">
          <Render
            blocks={blocks}
            useStyles
            blockComponentsMapper={{
              heading_2: withContentValidation(Heading2),
              heading_3: withContentValidation(Heading3),
              code: withContentValidation(BlockCode),
              paragraph: withContentValidation(Paragraph),
            }}
          />
        </article>

        <article className="relative col-span-1">
          <IntroBlock />
          <BlogOutline outline={tablecontent} />
        </article>
      </section>
    </Layout>
  );
}
