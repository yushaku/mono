import { isShowPanel } from "@/utils/atom";
import { topBar } from "@/utils/constants";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { IconArrowRight, IconTheme } from "ui";

export const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isShow, setIsShow] = useRecoilState(isShowPanel);
  const router = useRouter();
  const pathName = usePathname();

  const handleClick = (to: string) => {
    if (pathName === to) {
      setIsShow(!isShow);
    } else {
      router.push(to);
    }
  };

  return (
    <nav
      className={`w-20 rounded-3xl bg-white dark:bg-dark-100 ml-6 my-[2dvh] h-[96dvh] flex flex-col items-center`}
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
            const isSelected = pathName?.includes(href);

            const selectElement = isSelected
              ? "bg-strokeColor translate-x-9 rounded-full "
              : "";

            const selectLink = isSelected ? "gradient_bg" : "stroke-white";
            const selectIcon = isSelected
              ? "stroke-white"
              : "stroke-primaryColor";

            return (
              <li
                key={index}
                onClick={() => handleClick(href)}
                className={`${selectElement} w-full animationShow p-3`}
              >
                <button
                  className={`${selectLink} relative flex items-center p-4 rounded-full`}
                >
                  <Icon className={`${selectIcon} stroke-[3px] w-8 h-8`} />
                </button>

                {isSelected && pathName !== "/bots" ? (
                  <span className="absolute bottom-[32%] -right-1 bg-white rounded-full p-1 border-4 z-50 border-gray-200 animate-fade-right animate-once animate-duration-300 animate-ease-linear">
                    <IconArrowRight
                      className={`${
                        isShow ? "" : "rotate-180"
                      } stroke-primaryColor animationShow stroke-[4px] w-3 h-3`}
                    />
                  </span>
                ) : null}
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
