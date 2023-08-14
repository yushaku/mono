import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta httpEquiv="Content-Type" content="text/html;charset=UTF-8" />

        {/* Google / Search Engine Tags */}
        <meta itemProp="name" content="Story AI" />
        <meta
          itemProp="description"
          content="Supercharge personalized storytelling experiences with StoryAi"
        />
        <meta itemProp="image" content="../public/StoryAiLogo.jpg" />

        {/* Facebook Meta Tags */}
        <meta property="og:title" content="Story AI" />
        <meta
          property="og:description"
          content="Supercharge personalized storytelling experiences with StoryAi"
        />
        <meta property="og:url" content="https://dev.meetstory.ai/auth/login" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="../public/StoryAiLogo.jpg" />

        {/* Twitter Meta Tags  */}
        <meta name="twitter:card" content="../public/StoryAiLogo.jpg" />
        <meta name="twitter:title" content="Story AI" />
        <meta
          name="twitter:description"
          content="Supercharge personalized storytelling experiences with StoryAi"
        />
        <meta name="twitter:image" content="../public/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
