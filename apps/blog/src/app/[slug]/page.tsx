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
  blockEnum,
  indexGenerator,
  rnrSlugify,
  withContentValidation,
} from "@9gustin/react-notion-render";
import "@9gustin/react-notion-render/dist/index.css";
import moment from "moment";
import Image from "next/image";
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
          <div className="grid gap-4">
            <h3 className="text-textColor text-[36px] font-bold">
              {post.properties.Name.title[0].plain_text}
            </h3>
            <p className="text-grayColor flex items-center gap-3">
              <span>yushaku</span>
              <span className="bg-primaryColor inline-block h-2 w-2 rounded-full" />
              <span>{moment(post.created_time).format("LL")}</span>
            </p>
            <div className="relative h-[410px] w-full">
              <Image
                src={post.cover.external.url}
                alt="dsfsdf"
                loading="lazy"
                placeholder="empty"
                object-fit="cover"
                quality={100}
                fill={true}
              />
            </div>
          </div>

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
