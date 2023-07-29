import {
  Render,
  blockEnum,
  indexGenerator,
  rnrSlugify,
  withContentValidation as custom,
} from "@9gustin/react-notion-render";
import "@9gustin/react-notion-render/dist/index.css";
import {
  BlockCode,
  Heading2,
  Heading3,
  Paragraph,
  callout,
  numberList,
  quoteBlock,
} from "@/components/BlogDetail";
import { ContentWarper } from "@/components/ContentWarper";
import { BlogOutline } from "@/components/IntroBlock";
import { fetchPageBlocks, fetchPageBySlug } from "@/utils/notion";
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
    <ContentWarper title={post.properties.Name.title[0].plain_text}>
      <section className="relative grid grid-cols-2 gap-10 lg:grid-cols-3">
        <article className="col-span-2 overflow-y-scroll">
          <div className="grid gap-4">
            <h3 className="green_text_gradient text-[36px] font-bold">
              {post.properties.Name.title[0].plain_text}
            </h3>
            <p className="text-grayColor flex items-center gap-3">
              <span>yushaku</span>
              <span className="bg-primaryColor dark:bg-secondColor inline-block h-2 w-2 rounded-full" />
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
              heading_2: custom(Heading2),
              heading_3: custom(Heading3),
              code: custom(BlockCode),
              paragraph: custom(Paragraph),
              callout: custom(callout),
              numbered_list_item: custom(numberList),
              quote: custom(quoteBlock),
            }}
          />
        </article>

        <article className="relative col-span-2 md:col-span-1">
          <BlogOutline outline={tablecontent} />
        </article>
      </section>
    </ContentWarper>
  );
}
