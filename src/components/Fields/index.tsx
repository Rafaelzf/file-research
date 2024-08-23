import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import clsx from "clsx";
export function Fields({ fieldsOfStudy }: { fieldsOfStudy: any[] }) {
  return (
    <>
      {fieldsOfStudy.length &&
        fieldsOfStudy.map((fields: any, index: number) => {
          if (index > 0) return;
          return (
            <li key={fields}>
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={clsx(
                        fieldsOfStudy.length > 1 &&
                          "cursor-help hover:text-primary"
                      )}
                    >
                      {fields}
                    </span>
                  </TooltipTrigger>
                  {fieldsOfStudy.length > 1 && (
                    <>
                      <TooltipContent
                        side="top"
                        className="flex gap-3 border border-indigo-500 bg-white ml-12 rounded-lg mb-4 p-3"
                      >
                        {fieldsOfStudy.map((fil: any, i: number) => {
                          if (i === 0) return null;
                          return <span key={i}>{fil}, </span>;
                        })}
                      </TooltipContent>
                      <sup>+{fieldsOfStudy.length - 1}</sup>
                    </>
                  )}
                </Tooltip>
              </TooltipProvider>
            </li>
          );
        })}
    </>
  );
}
export default Fields;
