import { Card } from "@/components/ui/Card";
import { CustomersGroupIcon } from "@/components/icons/CustomerIcons";

/** Initial/no-search-yet state from the Figma "customer search" (1071:10286) frame — shown
 * before the admin has searched for anyone. Distinct from the "no customer found for ..."
 * state in `CustomersPage`, which only appears after a search comes back empty. */
export function CustomerSearchEmptyState() {
  return (
    <Card className="flex min-h-[420px] flex-1 flex-col items-center justify-center gap-3 p-[33px] text-center">
      <span className="flex size-[72px] shrink-0 items-center justify-center rounded-full bg-primary-lighter">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary-soft">
          <CustomersGroupIcon className="h-[22px] w-6 text-primary" />
        </span>
      </span>
      <h3 className="text-lg font-extrabold tracking-[-0.54px] text-ink">Search for a customer to view their profile.</h3>
      <p className="max-w-[420px] text-[13px] font-medium text-gray-500">
        Use phone number, email, or order ID to find account details and recent activity.
      </p>
    </Card>
  );
}
