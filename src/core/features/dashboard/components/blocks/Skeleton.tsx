export function DashboardSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-7">
      <div className="grid auto-rows-min gap-4 lg:grid-cols-3 items-center">
        <div role="status" className="h-56 bg-primary/10 rounded-xl animate-pulse ease-in-out" />
        <div role="status" className="h-56 bg-primary/10 rounded-xl animate-pulse ease-in-out" />
        <div role="status" className="h-56  bg-primary/10 rounded-xl animate-pulse ease-in-out" />
      </div>
      <div role="status" className="h-96 bg-primary/10 rounded-xl animate-pulse ease-in-out " />
    </div>
  );
}

export const AccordionItemSkeleton = () => (
  <div className="py-7 w-full rounded-xl border border-input bg-primary/10 animate-pulse ease-in-out" />
);
export function AccordionSkeleton({ numberItems }: { numberItems?: number }) {
  return (
    <div className="space-y-2 rounded-xl flex items-center justify-start flex-col w-full min-h-[500px] h-full">
      {Array.from({ length: numberItems ?? 7 }, (_, index) => (
        <AccordionItemSkeleton key={index} />
      ))}
    </div>
  );
}
