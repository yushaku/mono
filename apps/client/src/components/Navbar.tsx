import { topBar } from "@/utils/constants";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconTheme } from "ui";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const pathName = usePathname();

  return (
    <nav
      className={`w-20 rounded-3xl bg-white dark:bg-dark px-4 ml-6 my-[2dvh] h-[96dvh] flex flex-col items-center justify-between`}
    >
      <section className="py-4 my-8">
        <Link href="/" className="flexCenter">
          <Image
            alt="yushaku"
            src="/logo.png"
            width={40}
            height={40}
            loading="lazy"
          />
        </Link>

        <ul className="flex flex-col gap-4 mt-12">
          {topBar.map(({ href, icon: Icon }, index) => {
            const isSelected = pathName.includes(href);

            const selectElement = isSelected
              ? "bg-strokeColor translate-x-9 rounded-full "
              : "rounded-lg ";

            return (
              <li
                key={index}
                className={`${selectElement} w-full animationShow p-3`}
              >
                <Link
                  href={href}
                  prefetch
                  className="flex items-center bg-white p-4 rounded-full"
                >
                  <Icon
                    className="stroke-primaryColor w-8 h-8"
                    color="#234f66"
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mb-4">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          <IconTheme className="w-8 h-8" />
        </button>
      </section>
    </nav>
  );
};
