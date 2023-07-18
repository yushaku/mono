import { mocPricingData } from "@/utils/constants";
import { Button } from "ui";

const SettingBilling = () => {
  return (
    <div className="max-h-[77vh] overflow-auto scrollbar-hide">
      <h4 className="text-[22px] text-textColor font-semibold mb-[10px]">
        Pricing
      </h4>
      <p className="text-sm text-grayColor">
        Our pricing structure is designed to cater to a variety of needs,
        ensuring that you find the perfect solution for your organization.
      </p>

      <article className="grid grid-cols-1 md:grid-cols-3 md:gap-5 md:px-0 gap-10 lg:gap-[50px] lg:px-[60px] mt-10">
        {mocPricingData.map((priceItem, index) => {
          return (
            <div
              key={index}
              className="border relative text-center p-5 rounded-xl min-h-[550px] md:min-h-[650px] lg:min-h-[550px]"
            >
              <h2 className="text-lg font-semibold mb-3 text-textColor ">
                {priceItem.type}
              </h2>
              <p className="text-grayColor text-sm mb-2">
                {priceItem.description}
              </p>

              <p className="text-grayColor">
                <span className="font-bold text-2xl text-textColor">
                  ${priceItem.cost}/
                </span>
                per month
              </p>

              <hr className="mt-4 mb-3 border-[#F2F4F4]/10" />

              <ul className="grid gap-[10px] text-left">
                <h4 className="text-base font-medium mb-1 text-textColor">
                  This includes
                </h4>

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
                <Button title="Subscribe" className="w-[185px]" />
              </article>
            </div>
          );
        })}
      </article>

      <article className="text-center mt-8">
        <h3 className="text-[22px] text-textColor font-semibold mb-[10px]">
          End-to-end AI Enterprise Services
        </h3>
        <p className="text-sm text-grayColor">
          Look for a custom solution for your business? Contact the story AI
          enterprise team for more information.
        </p>
      </article>
    </div>
  );
};

export default SettingBilling;
