"use client";

import { useId, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { PlusIcon, EditIcon } from "@/components/icons/PromotionIcons";
import { CheckSmallIcon } from "@/components/icons/VendorDetailIcons";
import { COURIER_PARTNERS, getOnTimePercentClasses, type CourierPartner } from "@/lib/mock-data/shipping";

const LABEL_CLASSES = "text-[12px] font-semibold text-gray-500";
const INPUT_CLASSES =
  "min-w-0 w-full rounded-lg border border-border bg-[#fff8fb] px-3 py-1.5 text-[13px] font-medium text-ink focus:outline-none focus:border-primary disabled:opacity-60";

/** Discriminates which inline form is open (at most one at a time), matching
 * `CategoryManagementPanel`'s `FormMode` convention. */
type FormMode = { type: "add" } | { type: "edit"; courierId: string } | null;

interface DraftCourier {
  name: string;
  description: string;
  codSupported: boolean;
  isActive: boolean;
  avgSlaDays: number;
  priority: number;
}

function nextPriority(couriers: CourierPartner[]): number {
  return couriers.reduce((max, courier) => Math.max(max, courier.priority), 0) + 1;
}

const EMPTY_DRAFT: DraftCourier = {
  name: "",
  description: "",
  codSupported: true,
  isActive: true,
  avgSlaDays: 3,
  priority: 1,
};

/**
 * "Courier Partners" card — the first of the three sections on the Shipping settings screen
 * (Figma "shipping", node 1143:1675). Lists each courier's COD support, operational status,
 * on-time performance, average SLA, and dispatch priority, matching the design's 5 seeded rows
 * exactly. "+ Add Partner" and each row's pencil "Edit" action both open the same inline form —
 * Figma doesn't show a design for either (no inline-edit state is shown expanded in this table),
 * so this reuses `CategoryManagementPanel`'s inline-add/-edit-row pattern rather than inventing an
 * unrelated modal.
 */
export function CourierPartnersCard() {
  const [couriers, setCouriers] = useState<CourierPartner[]>(COURIER_PARTNERS);
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [draft, setDraft] = useState<DraftCourier>(EMPTY_DRAFT);
  const [formError, setFormError] = useState<string | null>(null);

  const nameId = useId();
  const descriptionId = useId();
  const slaId = useId();
  const priorityId = useId();

  function handleToggleCod(id: string) {
    const target = couriers.find((courier) => courier.id === id);
    if (!target) return;
    target.codSupported = !target.codSupported;
    setCouriers([...COURIER_PARTNERS]);
  }

  function handleToggleActive(id: string) {
    const target = couriers.find((courier) => courier.id === id);
    if (!target) return;
    target.isActive = !target.isActive;
    setCouriers([...COURIER_PARTNERS]);
  }

  function openAddForm() {
    setFormMode({ type: "add" });
    setDraft({ ...EMPTY_DRAFT, priority: nextPriority(couriers) });
    setFormError(null);
  }

  function openEditForm(courier: CourierPartner) {
    setFormMode({ type: "edit", courierId: courier.id });
    setDraft({
      name: courier.name,
      description: courier.description,
      codSupported: courier.codSupported,
      isActive: courier.isActive,
      avgSlaDays: courier.avgSlaDays,
      priority: courier.priority,
    });
    setFormError(null);
  }

  function closeForm() {
    setFormMode(null);
    setFormError(null);
  }

  function handleSave() {
    const trimmedName = draft.name.trim();
    if (!trimmedName) {
      setFormError("Please enter a courier name.");
      return;
    }
    const editingId = formMode?.type === "edit" ? formMode.courierId : null;
    const isDuplicate = couriers.some(
      (courier) => courier.id !== editingId && courier.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setFormError("A courier with this name already exists.");
      return;
    }

    if (formMode?.type === "edit") {
      const target = couriers.find((courier) => courier.id === editingId);
      if (target) {
        Object.assign(target, {
          name: trimmedName,
          description: draft.description.trim(),
          codSupported: draft.codSupported,
          isActive: draft.isActive,
          avgSlaDays: draft.avgSlaDays,
          priority: draft.priority,
        });
      }
    } else {
      const newCourier: CourierPartner = {
        id: `courier-${Date.now()}`,
        name: trimmedName,
        description: draft.description.trim() || "New courier partner",
        codSupported: draft.codSupported,
        isActive: draft.isActive,
        onTimePercent: 0,
        avgSlaDays: draft.avgSlaDays,
        priority: draft.priority,
      };
      COURIER_PARTNERS.push(newCourier);
    }
    setCouriers([...COURIER_PARTNERS]);
    closeForm();
  }

  function renderInlineForm(breadcrumbLabel: string, key: string) {
    return (
      <TableRow key={key} className="border-l-[3px] border-primary bg-[#fffcfd]">
        <TableCell colSpan={7} className="!py-4">
          <div className="flex min-w-0 flex-col gap-3">
            <span className="min-w-0 break-words text-xs font-bold text-primary">{breadcrumbLabel}</span>

            {formError && (
              <div role="alert" className="min-w-0 break-words rounded-lg bg-primary-lighter px-3 py-2 text-xs font-semibold text-primary">
                {formError}
              </div>
            )}

            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[160px] flex-col gap-1">
                <label htmlFor={nameId} className={LABEL_CLASSES}>
                  Courier Name
                </label>
                <input
                  id={nameId}
                  type="text"
                  value={draft.name}
                  onChange={(event) => setDraft((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="e.g. Shadowfax"
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex min-w-[220px] flex-1 flex-col gap-1">
                <label htmlFor={descriptionId} className={LABEL_CLASSES}>
                  Description
                </label>
                <input
                  id={descriptionId}
                  type="text"
                  value={draft.description}
                  onChange={(event) => setDraft((prev) => ({ ...prev, description: event.target.value }))}
                  placeholder="e.g. Hyperlocal same-day delivery"
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex min-w-[90px] flex-col gap-1">
                <label htmlFor={slaId} className={LABEL_CLASSES}>
                  Avg SLA (days)
                </label>
                <input
                  id={slaId}
                  type="number"
                  min={1}
                  max={30}
                  step={1}
                  inputMode="numeric"
                  value={draft.avgSlaDays}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, avgSlaDays: Math.min(30, Math.max(1, Number.parseInt(event.target.value, 10) || 1)) }))
                  }
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex min-w-[80px] flex-col gap-1">
                <label htmlFor={priorityId} className={LABEL_CLASSES}>
                  Priority
                </label>
                <input
                  id={priorityId}
                  type="number"
                  min={1}
                  max={99}
                  step={1}
                  inputMode="numeric"
                  value={draft.priority}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, priority: Math.min(99, Math.max(1, Number.parseInt(event.target.value, 10) || 1)) }))
                  }
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex flex-col gap-1">
                <span className={LABEL_CLASSES}>COD Supported</span>
                <div className="flex h-[30px] items-center gap-1.5">
                  <ToggleSwitch
                    checked={draft.codSupported}
                    onChange={() => setDraft((prev) => ({ ...prev, codSupported: !prev.codSupported }))}
                    ariaLabel="Toggle COD support for this courier"
                  />
                  <span className="text-xs font-semibold text-gray-500">{draft.codSupported ? "Yes" : "No"}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={LABEL_CLASSES}>Active</span>
                <div className="flex h-[30px] items-center gap-1.5">
                  <ToggleSwitch
                    checked={draft.isActive}
                    onChange={() => setDraft((prev) => ({ ...prev, isActive: !prev.isActive }))}
                    ariaLabel="Toggle this courier's operational status"
                  />
                  <span className={`text-xs font-semibold ${draft.isActive ? "text-success" : "text-gray-500"}`}>
                    {draft.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pb-0.5">
                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-bold text-white transition-opacity hover:opacity-90"
                >
                  <CheckSmallIcon className="size-3" />
                  Save
                </button>
                <button
                  type="button"
                  onClick={closeForm}
                  className="inline-flex h-8 items-center rounded-lg border border-border px-3.5 text-xs font-bold text-gray-500 hover:bg-surface-tint"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card className="flex w-full min-w-0 flex-col gap-4 p-[19px]">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <h2 className="text-[16px] font-extrabold text-ink">Courier Partners</h2>
          <p className="mt-1 min-w-0 break-words text-[12.5px] font-medium text-gray-500">
            Control which courier gets orders first, operational status, COD support, and delivery performance.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          disabled={formMode?.type === "add"}
          className="inline-flex h-9 shrink-0 items-center gap-2 rounded-[10px] border border-border bg-white px-[15px] text-[13px] font-bold text-ink transition-colors hover:bg-surface-tint disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PlusIcon className="size-3.5" />
          Add Partner
        </button>
      </div>

      <div className="w-full overflow-hidden rounded-xl border border-border">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Courier Name</TableHeaderCell>
              <TableHeaderCell>COD Supported</TableHeaderCell>
              <TableHeaderCell>Active</TableHeaderCell>
              <TableHeaderCell className="text-right">On-Time %</TableHeaderCell>
              <TableHeaderCell className="text-right">Avg SLA (days)</TableHeaderCell>
              <TableHeaderCell className="text-right">Priority</TableHeaderCell>
              <TableHeaderCell className="text-center">Edit</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formMode?.type === "add" && renderInlineForm("Adding New Partner", "__new-courier__")}
            {couriers
              .slice()
              .sort((a, b) => a.priority - b.priority)
              .map((courier) =>
                formMode?.type === "edit" && formMode.courierId === courier.id ? (
                  renderInlineForm(`Editing: ${courier.name}`, courier.id)
                ) : (
                  <TableRow key={courier.id}>
                    <TableCell className="min-w-0">
                      <p className="min-w-0 break-words text-[13px] font-bold text-ink">{courier.name}</p>
                      <p className="mt-0.5 min-w-0 break-words text-[12px] font-medium text-gray-500">{courier.description}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-2.5">
                        <ToggleSwitch
                          checked={courier.codSupported}
                          onChange={() => handleToggleCod(courier.id)}
                          ariaLabel={`Toggle COD support for ${courier.name} (currently ${courier.codSupported ? "supported" : "not supported"})`}
                        />
                        <span className="whitespace-nowrap text-xs font-bold text-ink">{courier.codSupported ? "Yes" : "No"}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex min-w-0 items-center gap-2.5">
                        <ToggleSwitch
                          checked={courier.isActive}
                          onChange={() => handleToggleActive(courier.id)}
                          ariaLabel={`Toggle ${courier.name}'s operational status (currently ${courier.isActive ? "active" : "inactive"})`}
                        />
                        <span className={`whitespace-nowrap text-xs font-bold ${courier.isActive ? "text-success" : "text-gray-500"}`}>
                          {courier.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={`whitespace-nowrap text-right text-[13px] font-bold ${getOnTimePercentClasses(courier.onTimePercent)}`}>
                      {courier.onTimePercent}%
                    </TableCell>
                    <TableCell className="whitespace-nowrap text-right text-[13px] font-bold text-ink">{courier.avgSlaDays} days</TableCell>
                    <TableCell className="text-right">
                      <span className="inline-flex min-h-[28px] min-w-[96px] items-center justify-center rounded-full bg-primary-lighter px-3 text-[12px] font-bold text-ink">
                        Priority {courier.priority}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <button
                        type="button"
                        aria-label={`Edit ${courier.name}`}
                        onClick={() => openEditForm(courier)}
                        className="inline-flex size-8 items-center justify-center rounded-lg border border-border bg-white text-gray-500 transition-colors hover:bg-surface-tint"
                      >
                        <EditIcon className="size-3.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                )
              )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
