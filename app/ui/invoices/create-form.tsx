'use client';

import { CustomerField } from '@/app/lib/definitions';
import Link from 'next/link';
import {
  CheckIcon,
  ClockIcon,
  CurrencyDollarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createInvoice, State } from '@/app/lib/actions';
import { useActionState } from 'react';

export default function Form({
  customers,
}: {
  customers: CustomerField[];
}) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createInvoice, initialState);

  return (
    <form action={formAction} noValidate>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        {/* CUSTOMER */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose customer
          </label>

          <div className="relative">
            <select
              name="customerId"
              defaultValue=""
              aria-describedby="customer-error"
              className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>

          <div id="customer-error" aria-live="polite">
            {state.errors?.customerId?.map((e) => (
              <p key={e} className="text-sm text-red-500 mt-2">
                {e}
              </p>
            ))}
          </div>
        </div>

        {/* AMOUNT */}
        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium">
            Choose an amount
          </label>

          <div className="relative">
            <input
              name="amount"
              type="number"
              step="0.01"
              placeholder="Enter USD amount"
              aria-describedby="amount-error"
              className="block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm"
            />

            <CurrencyDollarIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
          </div>

          <div id="amount-error" aria-live="polite">
            {state.errors?.amount?.map((e) => (
              <p key={e} className="text-sm text-red-500 mt-2">
                {e}
              </p>
            ))}
          </div>
        </div>

        {/* STATUS */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            Set invoice status
          </legend>

          <div className="rounded-md border bg-white px-4 py-3">
            <div className="flex gap-4">

              <label className="flex items-center gap-2">
                <input type="radio" name="status" value="pending" />
                Pending <ClockIcon className="h-4 w-4" />
              </label>

              <label className="flex items-center gap-2">
                <input type="radio" name="status" value="paid" />
                Paid <CheckIcon className="h-4 w-4" />
              </label>
            </div>
          </div>

          <div id="status-error" aria-live="polite">
            {state.errors?.status?.map((e) => (
              <p key={e} className="text-sm text-red-500 mt-2">
                {e}
              </p>
            ))}
          </div>
        </fieldset>
      </div>

      {/* ACTIONS */}
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard/invoices"
          className="rounded-lg bg-gray-100 px-4 py-2 text-sm"
        >
          Cancel
        </Link>

        <Button type="submit">Create Invoice</Button>
      </div>
    </form>
  );
}