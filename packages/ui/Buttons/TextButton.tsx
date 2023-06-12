export const LinkDocs = ({ title, link }: { title: string; link: string }) => {
  return (
    <a
      href={link}
      className="text-primaryColor font-medium underline underline-offset-2"
    >
      {title}
    </a>
  );
};
