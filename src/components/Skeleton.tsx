import { cn } from "@/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-lg bg-muted",
        className
      )}
    />
  );
}

export function AccountCardSkeleton() {
  return (
    <div className="rounded-2xl bg-card border border-border/50 p-6">
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-5 h-5 rounded" />
      </div>
      <Skeleton className="w-32 h-5 mb-2" />
      <Skeleton className="w-20 h-4 mb-4" />
      <Skeleton className="w-24 h-3 mb-2" />
      <Skeleton className="w-36 h-8" />
    </div>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <div>
          <Skeleton className="w-32 h-5 mb-2" />
          <Skeleton className="w-20 h-4" />
        </div>
      </div>
      <div className="text-right">
        <Skeleton className="w-24 h-5 mb-2" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Balance skeleton */}
      <div className="bg-card rounded-2xl border border-border/50 p-8">
        <Skeleton className="w-32 h-4 mb-4" />
        <Skeleton className="w-64 h-12" />
      </div>

      {/* Account cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <AccountCardSkeleton key={i} />
        ))}
      </div>

      {/* Transactions skeleton */}
      <div className="bg-card rounded-2xl border border-border/50">
        <div className="p-6 border-b border-border/50">
          <Skeleton className="w-36 h-6" />
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <TransactionRowSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
