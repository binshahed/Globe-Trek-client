import { Card, Skeleton } from "@nextui-org/react";

export default function ChartLoading() {
  return (
    <Card className="w-full space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-24 rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}
