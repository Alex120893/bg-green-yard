type HoursRow = { day: string; hours: string };

export function OpeningHoursTable({
  schedule,
  closedLabel,
  dayColumn,
  timeColumn,
}: {
  schedule: HoursRow[];
  closedLabel: string;
  dayColumn: string;
  timeColumn: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-brand-soft/50">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-brand-dark"
            >
              {dayColumn}
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-brand-dark"
            >
              {timeColumn}
            </th>
          </tr>
        </thead>
        <tbody>
          {schedule.map((row, index) => {
            const isClosed = row.hours === closedLabel;
            return (
              <tr
                key={row.day}
                className={`border-b border-border/60 last:border-0 ${
                  index % 2 === 1 ? "bg-surface/70" : ""
                } ${isClosed ? "bg-surface/40" : ""}`}
              >
                <th
                  scope="row"
                  className="px-4 py-2.5 text-left font-medium capitalize text-foreground"
                >
                  {row.day}
                </th>
                <td
                  className={`px-4 py-2.5 text-right tabular-nums ${
                    isClosed
                      ? "font-medium text-muted"
                      : "font-semibold text-brand-dark"
                  }`}
                >
                  {row.hours}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
