"use client";

import { Fragment, useId, useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@/components/ui/Table";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { PlusIcon, EditIcon } from "@/components/icons/PromotionIcons";
import { ChevronDownIcon, CheckSmallIcon } from "@/components/icons/VendorDetailIcons";
import { ChevronRightIcon } from "@/components/icons/VendorIcons";
import { SubcategoryArrowIcon } from "@/components/icons/SettingsIcons";
import { DEFAULT_EXPANDED_CATEGORY_IDS, PLATFORM_CATEGORIES, type PlatformCategory } from "@/lib/mock-data/settings";

const TOP_LEVEL_OPTION_VALUE = "";

/** Slugify a category name into an id fragment, matching `CouponForm`'s `slugify` convention. */
function slugify(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

/** Discriminates which inline form is open (at most one at a time — matches the Figma design,
 * which only ever shows a single inline edit row active in the tree). */
type FormMode = { type: "add" } | { type: "edit"; categoryId: string } | null;

const LABEL_CLASSES = "text-[12px] font-semibold text-gray-500";
const INPUT_CLASSES =
  "min-w-0 w-full rounded-lg border border-border bg-[#fff8fb] px-3 py-1.5 text-[13px] font-medium text-ink focus:outline-none focus:border-primary disabled:opacity-60";
const SELECT_WRAPPER_CLASSES =
  "flex h-[30px] min-w-[140px] items-center gap-1.5 rounded-lg border border-border bg-[#fff8fb] px-3 focus-within:border-primary";
const SELECT_CLASSES = "min-w-0 flex-1 appearance-none bg-transparent text-[13px] font-medium text-ink focus:outline-none disabled:opacity-60";

/**
 * "Category Management" settings panel (Figma "category management", node 1071:9230) — a
 * two-level tree of the platform's product categories and sub-categories, each expandable/
 * collapsible, with an inline Add/Edit form (name, parent category, active status) and a
 * per-row Active/Inactive toggle. See `settings.ts`'s `PLATFORM_CATEGORIES` doc comment for how
 * this screen's category names line up with (but aren't live-bound to) `CommissionRatesPanel`'s
 * `COMMISSION_CATEGORY_RATES`.
 *
 * Deviation from Figma: the design only shows the inline edit form replacing an existing
 * sub-category row ("Inline edit row for Lehengas"), not a dedicated "add" layout. Rather than
 * inventing an unrelated add-category modal, "+ Add New Category" reuses that same inline-form
 * pattern, rendered as its own row directly under the table header.
 */
export function CategoryManagementPanel() {
  const [categories, setCategories] = useState<PlatformCategory[]>(PLATFORM_CATEGORIES);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(DEFAULT_EXPANDED_CATEGORY_IDS));
  const [formMode, setFormMode] = useState<FormMode>(null);
  const [draftName, setDraftName] = useState("");
  const [draftParentId, setDraftParentId] = useState<string | null>(null);
  const [draftIsActive, setDraftIsActive] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);

  const nameId = useId();
  const parentId = useId();

  const topLevelCategories = useMemo(() => categories.filter((category) => category.parentId === null), [categories]);
  const childrenByParentId = useMemo(() => {
    const map = new Map<string, PlatformCategory[]>();
    categories.forEach((category) => {
      if (!category.parentId) return;
      const siblings = map.get(category.parentId) ?? [];
      siblings.push(category);
      map.set(category.parentId, siblings);
    });
    return map;
  }, [categories]);

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleToggleActive(id: string) {
    const target = categories.find((category) => category.id === id);
    if (!target) return;
    target.isActive = !target.isActive;
    setCategories([...PLATFORM_CATEGORIES]);
  }

  function openAddForm() {
    setFormMode({ type: "add" });
    setDraftName("");
    setDraftParentId(null);
    setDraftIsActive(true);
    setFormError(null);
  }

  function openEditForm(category: PlatformCategory) {
    setFormMode({ type: "edit", categoryId: category.id });
    setDraftName(category.name);
    setDraftParentId(category.parentId);
    setDraftIsActive(category.isActive);
    setFormError(null);
  }

  function closeForm() {
    setFormMode(null);
    setFormError(null);
  }

  function handleSave() {
    const trimmedName = draftName.trim();
    if (!trimmedName) {
      setFormError("Please enter a category name.");
      return;
    }
    const editingId = formMode?.type === "edit" ? formMode.categoryId : null;
    const isDuplicate = categories.some(
      (category) => category.id !== editingId && category.name.toLowerCase() === trimmedName.toLowerCase()
    );
    if (isDuplicate) {
      setFormError("A category with this name already exists.");
      return;
    }

    if (formMode?.type === "edit") {
      const target = categories.find((category) => category.id === editingId);
      if (target) {
        Object.assign(target, { name: trimmedName, parentId: draftParentId, isActive: draftIsActive });
      }
    } else {
      const newCategory: PlatformCategory = {
        id: `cat-${slugify(trimmedName)}` || `cat-${Date.now()}`,
        name: trimmedName,
        parentId: draftParentId,
        productCount: 0,
        isActive: draftIsActive,
      };
      PLATFORM_CATEGORIES.push(newCategory);
      if (draftParentId) {
        setExpandedIds((prev) => new Set(prev).add(draftParentId));
      }
    }
    setCategories([...PLATFORM_CATEGORIES]);
    closeForm();
  }

  const editingCategory = formMode?.type === "edit" ? categories.find((category) => category.id === formMode.categoryId) : undefined;
  const editingHasChildren = editingCategory ? (childrenByParentId.get(editingCategory.id)?.length ?? 0) > 0 : false;
  // A top-level category that already has sub-categories can't be re-parented — doing so would
  // orphan its children (this tree is only ever rendered two levels deep, so a demoted parent's
  // existing children would stop appearing anywhere).
  const parentFieldLocked = editingHasChildren;

  function renderInlineForm(breadcrumbLabel: string, key: string) {
    return (
      <TableRow key={key} className="border-l-[3px] border-primary bg-[#fffcfd]">
        <TableCell colSpan={5} className="!py-4">
          <div className="flex min-w-0 flex-col gap-3">
            <div className="flex min-w-0 items-center gap-1.5 pl-[2px]">
              <SubcategoryArrowIcon className="size-3 shrink-0 text-primary" />
              <span className="min-w-0 break-words text-xs font-bold text-primary">{breadcrumbLabel}</span>
            </div>

            {formError && (
              <div role="alert" className="min-w-0 break-words rounded-lg bg-primary-lighter px-3 py-2 text-xs font-semibold text-primary">
                {formError}
              </div>
            )}

            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[140px] flex-col gap-1">
                <label htmlFor={nameId} className={LABEL_CLASSES}>
                  Category Name
                </label>
                <input
                  id={nameId}
                  type="text"
                  value={draftName}
                  onChange={(event) => setDraftName(event.target.value)}
                  placeholder="e.g. Sarees"
                  className={INPUT_CLASSES}
                />
              </div>

              <div className="flex min-w-[140px] flex-col gap-1">
                <label htmlFor={parentId} className={LABEL_CLASSES}>
                  Parent Category
                </label>
                <div className={SELECT_WRAPPER_CLASSES}>
                  <select
                    id={parentId}
                    value={draftParentId ?? TOP_LEVEL_OPTION_VALUE}
                    onChange={(event) => setDraftParentId(event.target.value === TOP_LEVEL_OPTION_VALUE ? null : event.target.value)}
                    disabled={parentFieldLocked}
                    className={SELECT_CLASSES}
                  >
                    <option value={TOP_LEVEL_OPTION_VALUE}>— (Top Level) —</option>
                    {topLevelCategories
                      .filter((category) => category.id !== (formMode?.type === "edit" ? formMode.categoryId : null))
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                  </select>
                  <ChevronDownIcon className="size-3 shrink-0 text-gray-400" />
                </div>
                {parentFieldLocked && (
                  <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">
                    Has sub-categories, so it can&apos;t be nested under another category.
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <span className={LABEL_CLASSES}>Status</span>
                <div className="flex h-[30px] items-center gap-1.5">
                  <ToggleSwitch
                    checked={draftIsActive}
                    onChange={() => setDraftIsActive((prev) => !prev)}
                    ariaLabel="Toggle category active status"
                  />
                  <span className={`text-xs font-semibold ${draftIsActive ? "text-success" : "text-gray-500"}`}>
                    {draftIsActive ? "Active" : "Inactive"}
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

            <p className="min-w-0 break-words text-[11px] font-medium text-gray-500">Changes apply immediately to the platform catalog.</p>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  function renderCategoryRow(category: PlatformCategory, isSubcategory: boolean) {
    if (formMode?.type === "edit" && formMode.categoryId === category.id) {
      return renderInlineForm(`Editing: ${category.name}`, category.id);
    }

    const hasChildren = (childrenByParentId.get(category.id)?.length ?? 0) > 0;
    const isExpanded = expandedIds.has(category.id);
    const parentCategory = category.parentId ? categories.find((c) => c.id === category.parentId) : undefined;

    return (
      <TableRow key={category.id} className={isSubcategory ? "bg-white" : "bg-surface-tint"}>
        <TableCell className="min-w-0">
          <div className={`flex min-w-0 items-center gap-2 ${isSubcategory ? "pl-[26px]" : ""}`}>
            {isSubcategory ? (
              <SubcategoryArrowIcon className="size-3 shrink-0 text-gray-400" />
            ) : hasChildren ? (
              <button
                type="button"
                onClick={() => toggleExpanded(category.id)}
                aria-label={`${isExpanded ? "Collapse" : "Expand"} ${category.name}`}
                aria-expanded={isExpanded}
                className="flex size-[22px] shrink-0 items-center justify-center rounded text-gray-500 hover:bg-white"
              >
                {isExpanded ? <ChevronDownIcon className="size-3.5" /> : <ChevronRightIcon className="size-3.5" />}
              </button>
            ) : (
              <span className="size-[22px] shrink-0" />
            )}
            <span className={`min-w-0 break-words text-[13px] ${isSubcategory ? "font-medium text-ink" : "font-bold text-ink"}`}>
              {category.name}
            </span>
          </div>
        </TableCell>
        <TableCell>
          {parentCategory ? (
            <span className="min-w-0 max-w-[124px] truncate whitespace-nowrap rounded-full bg-surface-tint px-2 py-0.5 text-[11px] font-semibold text-gray-500">
              {parentCategory.name}
            </span>
          ) : (
            <span className="whitespace-nowrap rounded-full bg-surface-tint px-2 py-0.5 text-[11px] font-semibold text-gray-500">—</span>
          )}
        </TableCell>
        <TableCell className="whitespace-nowrap font-semibold text-gray-500">{category.productCount.toLocaleString("en-IN")}</TableCell>
        <TableCell>
          <div className="flex min-w-0 items-center gap-1.5">
            <ToggleSwitch
              checked={category.isActive}
              onChange={() => handleToggleActive(category.id)}
              ariaLabel={`Toggle ${category.name} status (currently ${category.isActive ? "active" : "inactive"})`}
            />
            <span className={`whitespace-nowrap text-xs font-semibold ${category.isActive ? "text-success" : "text-gray-500"}`}>
              {category.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <button
            type="button"
            aria-label={`Edit ${category.name}`}
            onClick={() => openEditForm(category)}
            className="flex size-7 items-center justify-center rounded-lg border border-border bg-white text-gray-500 transition-colors hover:bg-surface-tint"
          >
            <EditIcon className="size-3.5" />
          </button>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <Card className="flex min-w-0 flex-1 flex-col">
      <div className="flex min-w-0 flex-wrap items-start justify-between gap-4 border-b border-border px-5 py-[18px]">
        <div className="min-w-0">
          <h2 className="text-base font-extrabold tracking-[-0.48px] text-ink">Category Management</h2>
          <p className="mt-1 min-w-0 break-words text-xs font-medium text-gray-500">
            Add, edit, or toggle categories and sub-categories used across the platform catalog.
          </p>
        </div>
        <button
          type="button"
          onClick={openAddForm}
          disabled={formMode?.type === "add"}
          className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-[10px] border border-primary px-4 text-[13px] font-bold text-primary transition-colors hover:bg-primary-lighter disabled:cursor-not-allowed disabled:opacity-60"
        >
          <PlusIcon className="size-3.5" />
          Add New Category
        </button>
      </div>

      <div className="p-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Category Name</TableHeaderCell>
              <TableHeaderCell>Parent Category</TableHeaderCell>
              <TableHeaderCell>Products</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Edit</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formMode?.type === "add" && renderInlineForm("Adding New Category", "__new-category__")}
            {topLevelCategories.map((category) => (
              <Fragment key={category.id}>
                {renderCategoryRow(category, false)}
                {expandedIds.has(category.id) &&
                  (childrenByParentId.get(category.id) ?? []).map((child) => renderCategoryRow(child, true))}
              </Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
}
