import { mocPricingData } from "@/utils/constants";
import { Button } from "ui";

const SettingBilling = () => {
  return (
    <div className="h-[85dvh] text-center overflow-hidden scrollbar-hide pb-4">
      <h4 className="text-[22px] text-textColor font-semibold mb-[10px]">
        Pricing
      </h4>
      <p className="text-sm text-grayColor">
        Our pricing structure is designed to cater to a variety of needs,
        ensuring that you find the perfect solution for your organization.
      </p>

      <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-5 md:px-0 gap-10 lg:gap-[50px] lg:px-[60px] mt-6">
        {mocPricingData.map((priceItem, index) => {
          return (
            <div
              key={index}
              className="group animationShow hover:shadow-xl border relative text-center p-5 rounded-3xl min-h-[550px] md:min-h-[650px] lg:min-h-[550px]"
            >
              <h2 className="text-lg group-hover:text-primaryColor animationShow font-semibold mb-1 text-textColor ">
                {priceItem.type}
              </h2>
              <p className="text-grayColor text-sm mb-2">
                {priceItem.description}
              </p>

              <p className="text-grayColor">
                <span className="font-bold text-2xl text-textColor group-hover:text-primaryColor animationShow">
                  ${priceItem.cost}/
                </span>
                per month
              </p>

              <h4 className="text-base font-medium text-grayColor mt-3">
                This includes:
              </h4>

              <ul className="grid gap-[10px] text-left list-disc">
                {priceItem.features.map((feature, index) => {
                  return (
                    <li key={index} className="flex items-center">
                      <span className="ml-2 text-grayColor text-sm">
                        {feature}
                      </span>
                    </li>
                  );
                })}
              </ul>

              <article className="block absolute bottom-5 left-1/2 -translate-x-1/2">
                <Button
                  title="Subscribe"
                  className="w-[185px] group-hover:bg-primaryColor group-hover:text-white animationShow"
                />
              </article>
            </div>
          );
        })}
      </article>
    </div>
  );
};

export default SettingBilling;
