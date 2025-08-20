import { ScrollArea } from '@/core/components/shadcn/ui/scroll-area';

function SidebarFilter() {
  return (
    <ScrollArea className="size-full px-[5%]">
      <div className="pb-2 flex justify-between items-center w-full">
        <h3 className=" font-semibold">Filters</h3>
        <button type="button" className="text-sm text-red-700">
          remove filters
        </button>
      </div>
      <div>
        {/*           

          <Button
            type="submit"
            variant={"default"}
            className="mt-5"
            onClick={submitFilters}
          >
            Submit
          </Button> */}
      </div>
    </ScrollArea>
  );
}

export default SidebarFilter;
