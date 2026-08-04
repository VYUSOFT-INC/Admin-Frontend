import { redirect } from "next/navigation";

/** `/settings` has no content of its own in the Figma design — every Settings screen (Commission
 * Rates, Payout Schedule, etc.) is a sub-route with its own sub-nav + panel. Land on Commission
 * Rates by default, the same way the Sidebar's "Settings" link (still just `/settings`) expects
 * a real page to exist at this path. */
export default function SettingsIndexPage() {
  redirect("/settings/commission");
}
