const EDITABLE_STATUSES = ["submitted", "waitlist", "accepted", "confirmed"];
const WITHDRAWABLE_STATUSES = ["submitted", "waitlist"];
const DECLINABLE_STATUSES = ["accepted", "confirmed"];
const TERMINAL_STATUSES = ["withdrawn", "not_attending"];

export const canEditRegistration = (status: string) =>
  EDITABLE_STATUSES.includes(status);

export const canWithdrawRegistration = (status: string) =>
  WITHDRAWABLE_STATUSES.includes(status);

export const canDeclineRegistration = (status: string) =>
  DECLINABLE_STATUSES.includes(status);

export const isTerminalRegistration = (status: string) =>
  TERMINAL_STATUSES.includes(status);
